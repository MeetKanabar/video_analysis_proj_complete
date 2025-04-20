# server/audio_analysis/analyze_audio.py

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
    print("\n🔍 Starting Full Audio Analysis Pipeline...\n")

    # 1. Transcription
    print("🎙️ Transcribing audio...")
    text = transcribe_audio(audio_path)
    if not text:
        print("❌ Aborting pipeline: No text could be transcribed.")
        return
    print("📄 Transcription:\n", text)

    # 2. Filler Word Analysis
    print("\n🟨 Filler Word Analysis:")
    analyze_filler_words(text)

    # 3. Pause Analysis
    print("\n⏸️ Pause Analysis:")
    analyze_pauses(audio_path)

    # 4. Speech Speed Analysis
    print("\n🚀 Speech Speed Analysis:")
    analyze_speech_speed(audio_path)

    # 5. Energy Level
    print("\n⚡ Energy Level Analysis:")
    result = compute_energy_level(audio_path)
    print(f"🧪 RMS Energy        : {result['avg_rms']:.5f}")
    print(f"🎵 Pitch Variation  : {result['pitch_variation']:.2f}")
    print(f"🔋 Energy Level     : {result['energy_level']}")

    # 6. Pitch + Loudness Plot
    print("\n📊 Pitch & Loudness Visualization:")
    y, sr = load_audio(audio_path)
    pitch_vals = analyze_pitch(y, sr)
    rms, time_rms = analyze_loudness(y, sr)
    plot_audio_features(y, sr, pitch_vals, rms, time_rms)

    # 7. Paraphrasing
    print("\n🔁 Paraphrasing (LLM-based):")
    paraphrased = paraphrase_text(text)
    if paraphrased:
        print("📝 Paraphrased Output:\n", paraphrased)
    else:
        print("⚠️ No paraphrased output returned.")

    print("\n✅ All modules completed.\n")


if __name__ == "__main__":
    audio_file_path = "./output.wav"  # Change to match your actual path
    analyze_audio_pipeline(audio_file_path)
