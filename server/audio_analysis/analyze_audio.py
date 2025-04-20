# audio_analysis/analyze_audio.py

from audio_analysis.utils.transcription import audio_to_text
from audio_analysis.utils.filler_words import analyze_filler_words
from audio_analysis.utils.pause_analysis import analyze_pauses
from audio_analysis.utils.speech_speed import analyze_speech_speed
from audio_analysis.utils.energy_level import compute_energy_level, load_audio, analyze_pitch, analyze_loudness
from audio_analysis.plots.audio_features import plot_audio_features
from audio_analysis.llm_helpers.paraphrase import paraphrase_text


def analyze_audio_pipeline(audio_path):
    print("\n🔍 Starting Full Audio Analysis Pipeline...\n")
    
    # 1. Transcription
    print("🎙️ Transcribing audio...")
    text = audio_to_text(audio_path)
    print("📄 Transcription:\n", text)

    # 2. Filler Word Analysis
    print("\n🟨 Filler Word Analysis:")
    analyze_filler_words(text)

    # 3. Pause Analysis
    print("\n⏸️ Pause Analysis:")
    pause_feedback = analyze_pauses(audio_path)
    print(pause_feedback)

    # 4. Speech Speed Analysis
    print("\n🚀 Speech Speed Analysis:")
    analyze_speech_speed(audio_path)

    # 5. Energy Level Analysis
    print("\n⚡ Energy Level Analysis:")
    energy_result = compute_energy_level(audio_path)
    for key, value in energy_result.items():
        print(f"{key}: {value}")

    # 6. Pitch and Loudness Visualization
    print("\n📊 Generating Pitch and Loudness Plot...")
    y, sr = load_audio(audio_path)
    pitch_vals = analyze_pitch(y, sr)
    rms, time_rms = analyze_loudness(y, sr)
    plot_audio_features(y, sr, pitch_vals, rms, time_rms)

    # 7. Paraphrasing (LLM-based)
    print("\n🔁 Paraphrasing:")
    paraphrased = paraphrase_text(text)
    print("📝 Paraphrased Text:\n", paraphrased or "No output")

    print("\n✅ Audio analysis complete.\n")


if __name__ == "__main__":
    audio_file_path = "./output.wav"  # 🔁 Replace with your actual file path
    analyze_audio_pipeline(audio_file_path)
