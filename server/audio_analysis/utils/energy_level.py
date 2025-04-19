import librosa
import numpy as np
import matplotlib.pyplot as plt

def compute_energy_level(audio_file_path, plot=False):
    """
    Compute average RMS energy and pitch variation to estimate energy level in speech.

    Args:
        audio_file_path (str): Path to the input audio file.
        plot (bool): Whether to plot RMS over time (for debugging).

    Returns:
        dict: avg_rms, pitch_variation, and energy_level label.
    """
    print(f"\n📥 Analyzing energy level from file: {audio_file_path}")

    # Step 1: Load audio
    y, sr = librosa.load(audio_file_path)
    print(f"🔍 Loaded audio with {len(y)} samples at {sr} Hz")

    # Step 2: Compute RMS energy
    rms = librosa.feature.rms(y=y)[0]
    avg_rms = float(np.mean(rms))
    print(f"⚡ Average RMS Energy: {avg_rms:.5f}")

    # Step 3: Compute pitch variation (basic)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = pitches[magnitudes > np.median(magnitudes)]
    pitch_std = float(np.std(pitch_values))
    print(f"🎵 Pitch Variation (std dev): {pitch_std:.2f}")

    # Step 4: Heuristic classification
    if avg_rms > 0.04 and pitch_std > 30:
        energy_label = "High Energy"
    elif avg_rms < 0.015:
        energy_label = "Low Energy"
    else:
        energy_label = "Moderate Energy"

    print(f"✅ Energy Level: {energy_label}")

    # Optional plot
    if plot:
        time = librosa.times_like(rms, sr=sr)
        plt.figure(figsize=(10, 4))
        plt.plot(time, rms, label='RMS Energy', color='orange')
        plt.title("RMS Energy Over Time")
        plt.xlabel("Time (s)")
        plt.ylabel("Energy")
        plt.grid(True)
        plt.tight_layout()
        plt.show()

    return {
        "avg_rms": avg_rms,
        "pitch_variation": pitch_std,
        "energy_level": energy_label
    }


# 🔧 Run directly for testing
if __name__ == "__main__":
    sample_path = "./plots/output.wav"  # Replace with your file path
    results = compute_energy_level(sample_path, plot=True)

    print("\n📊 Final Energy Metrics:")
    print(f"   RMS Energy     : {results['avg_rms']:.5f}")
    print(f"   Pitch Variation: {results['pitch_variation']:.2f}")
    print(f"   Energy Level   : {results['energy_level']}")
