import json
import os
import re
from audio_analysis.utils.transcription import transcribe_audio
from audio_analysis.utils.filler_words import analyze_filler_words
from audio_analysis.utils.pause_analysis import analyze_pauses
from audio_analysis.utils.speech_speed import analyze_speech_speed
from audio_analysis.utils.energy_level import (
    compute_energy_level, load_audio, analyze_pitch, analyze_loudness
)
from audio_analysis.plots.audio_features import plot_audio_features
from audio_analysis.llm_helpers.paraphrase import paraphrase_text
import numpy as np
from audio_analysis.llm_helpers.generate_feedback import generate_structured_feedback

def analyze_audio_pipeline(audio_path):
    result = {}

    

    # 1. Transcription
    text = transcribe_audio(audio_path)
    if not text:
        return json.dumps({ "error": "Unable to transcribe audio." })

    result["transcription"] = {
        "text": text,
        "fillerWords": analyze_filler_words(text, verbose=False)["counts"]
    }

    # 2. Pause Analysis
    pause_data = analyze_pauses(audio_path, verbose=False)
    result["pauses"] = {
        "count": pause_data["short_pauses"] + pause_data["long_pauses"],
        "shortPauses": pause_data["short_pauses"],
        "longPauses": pause_data["long_pauses"],
        "feedback": (
            "You have a good balance of pauses. Consider adding more strategic pauses before key points for emphasis."
            if pause_data["long_pauses"] <= 5 else
            "You tend to pause frequently. Try reducing long pauses to improve flow."
        )
    }

    # 3. Speech Speed
    speed_data = analyze_speech_speed(audio_path, verbose=False)
    wpm = speed_data["wpm"]
    result["speed"] = {
        "wpm": wpm,
        "assessment": (
            "slow" if wpm < 120 else "fast" if wpm > 180 else "moderate"
        ),
        "feedback": (
            "You're speaking a bit slow. Speeding up could enhance engagement."
            if wpm < 120 else
            "You're speaking a bit fast. Slowing down may improve clarity."
            if wpm > 180 else
            "Your speaking pace is good, averaging {:.0f} words per minute.".format(wpm)
        )
    }

    # 4. Energy Level
    energy = compute_energy_level(audio_path, plot=False)
    level = energy["energy_level"]
    result["energy"] = {
        "level": level.lower(),
        "variation": (
        "low" if energy["pitch_variation"] <= 40 else  # Adjusted threshold
        "high" if energy["pitch_variation"] > 120 else  # Adjusted threshold
        "medium"
        ),
        "averageRMS": round(energy["avg_rms"], 5),
        "feedback": (
            "Your energy level is consistent. Try modulating tone for key points."
            if level == "Moderate Energy" else
            "Great enthusiasm! Keep it up!" if level == "High Energy" else
            "Try using more energy and vocal variety to keep attention."
        )
    }

   # 5. Pitch + Loudness Plot
    y, sr = load_audio(audio_path)
    pitch_values = analyze_pitch(y, sr)
    rms, time_rms = analyze_loudness(y, sr)

    valid_pitches = [p for p in pitch_values if p > 0]
    if valid_pitches:
        avg_pitch = float(sum(valid_pitches) / len(valid_pitches))  # Convert to float
        pitch_var = float(max(valid_pitches) - min(valid_pitches))  # Convert to float
    else:
        avg_pitch = 0.0
        pitch_var = 0.0

    result["pitch"] = {
        "average": round(avg_pitch),
        "variation": round(pitch_var),
       "data": [
        {
            "time": round(float(time_rms[i]), 2),
            "pitch": 0 if i >= len(pitch_values) or np.isnan(pitch_values[i]) else round(float(pitch_values[i]), 2),
            "volume": round(float(rms[i]), 3) if i < len(rms) else 0
        }
        for i in range(0, min(len(pitch_values), len(rms)), 25)  # sample every 100 frames
        ]
    }

    # Feedback based on pitch variation and average pitch
    pitch_feedback = []

    if avg_pitch < 100:
        pitch_feedback.append("Your pitch is on the lower side — you may sound calm or flat.")
    elif avg_pitch > 300:
        pitch_feedback.append("Your pitch is quite high — consider softening your tone.")

    if pitch_var < 30:
        pitch_feedback.append("Try adding more vocal variety to avoid sounding monotone.")
    elif pitch_var > 100:
        pitch_feedback.append("You're using good pitch variation. That’s great for engagement!")

    result["pitch"]["feedback"] = " ".join(pitch_feedback)

    

    # 6. Paraphrasing
    paraphrased_result = paraphrase_text(text)
    if paraphrased_result and isinstance(paraphrased_result, dict):
        result["paraphrased"] = {
            "type": paraphrased_result.get("type", "single"),
            "options": paraphrased_result.get("options", [])[:5]  # Limit to top 3
        }
    else:
        result["paraphrased"] = {
            "type": "single",
            "options": ["Paraphrasing failed or no meaningful output returned."]
        }



    # 7. Revised Overall Score Calculation (Weighted Composite)
    filler_penalty = sum(result["transcription"]["fillerWords"].values())
    pause_penalty = result["pauses"]["longPauses"]
    speed_score = 1 if result["speed"]["assessment"] == "moderate" else 0
    energy_score = 1 if result["energy"]["level"] == "moderate energy" else 2 if result["energy"]["level"] == "high energy" else 0
    pitch_score = 1 if result["pitch"]["variation"] > 40 else 0
    emotion_bonus = 2 if result.get("emotion", {}).get("emotion", {}).get("primary") in ["happy", "surprise"] else 0

    # Weighted scoring
    score = 100
    score -= filler_penalty * 1.5       # Mild penalty per filler
    score -= pause_penalty * 2          # Stronger penalty for excessive long pauses
    score += speed_score * 5
    score += energy_score * 5
    score += pitch_score * 5
    score += emotion_bonus * 3

    # Clamp score to 60–100
    score = int(max(min(score, 100), 60))

    result["overallScore"] = score
    result["overallFeedback"] = (
        "Outstanding delivery with strong vocal energy and clarity!"
        if score > 85 else
        "Good delivery. Focus on reducing fillers and maintaining pitch variety."
        if score > 70 else
        "Keep practicing! Work on pacing, reducing fillers, and adding vocal variety."
    )

    # 0. Feedback Generation
    feedback = generate_structured_feedback(result)
    if feedback:
        result["section_feedback"] = feedback


    return json.dumps(result, indent=2)

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No audio file path provided." }))
    else:
        audio_file_path = sys.argv[1]
        print(analyze_audio_pipeline(audio_file_path))
