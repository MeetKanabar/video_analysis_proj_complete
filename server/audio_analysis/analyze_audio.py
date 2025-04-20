import json
import os
from server.audio_analysis.utils.transcription import transcribe_audio
from server.audio_analysis.utils.filler_words import analyze_filler_words
from server.audio_analysis.utils.pause_analysis import analyze_pauses
from server.audio_analysis.utils.speech_speed import analyze_speech_speed
from server.audio_analysis.utils.energy_level import (
    compute_energy_level, load_audio, analyze_pitch, analyze_loudness
)
from server.audio_analysis.plots.audio_features import plot_audio_features
from server.audio_analysis.llm_helpers.paraphrase import paraphrase_text


def analyze_audio_pipeline(audio_path):
    result = {}

    # 1. Transcription
    text = transcribe_audio(audio_path)
    if not text:
        return json.dumps({ "error": "Unable to transcribe audio." })

    result["transcription"] = text

    # 2. Filler Word Analysis
    filler_data = analyze_filler_words(text, verbose=False)
    result["filler_words"] = filler_data

    # 3. Pause Analysis
    pause_data = analyze_pauses(audio_path, verbose=False)
    result["pauses"] = pause_data

    # 4. Speech Speed Analysis
    speed_data = analyze_speech_speed(audio_path, verbose=False)
    result["speech_speed"] = speed_data

    # 5. Energy Level
    energy_data = compute_energy_level(audio_path, plot=False)
    result["energy"] = energy_data

    # 6. Pitch & Loudness Visualization
    y, sr = load_audio(audio_path)
    pitch_vals = analyze_pitch(y, sr)
    rms, time_rms = analyze_loudness(y, sr)
    plot_path = "./server/audio_analysis/output/pitch_loudness.png"
    os.makedirs(os.path.dirname(plot_path), exist_ok=True)
    plot_audio_features(y, sr, pitch_vals, rms, time_rms, save_path=plot_path)
    result["pitch_plot_path"] = plot_path

    # 7. Paraphrasing
    paraphrased = paraphrase_text(text)
    result["paraphrased"] = paraphrased

    # ✅ Final Output
    return json.dumps(result, indent=2)


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No audio file path provided." }))
    else:
        audio_file_path = sys.argv[1]
        print(analyze_audio_pipeline(audio_file_path))
