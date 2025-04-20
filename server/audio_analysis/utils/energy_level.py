import librosa
import numpy as np
import matplotlib.pyplot as plt
import sys


def compute_energy_level(audio_file_path, plot=False):
    """
    Compute average RMS energy and pitch variation to estimate energy level in speech.

    Args:
        audio_file_path (str): Path to the input audio file.
        plot (bool): Whether to plot RMS over time (for debugging).

    Returns:
        dict: avg_rms, pitch_variation, and energy_level label.
    """
    print(f"\n[INFO] Analyzing energy level from file: {audio_file_path}", file=sys.stderr)

    # Step 1: Load audio
    y, sr = librosa.load(audio_file_path)
    print(f"[INFO] Loaded audio with {len(y)} samples at {sr} Hz", file=sys.stderr)

    # Step 2: Compute RMS energy
    rms = librosa.feature.rms(y=y)[0]
    avg_rms = float(np.mean(rms))
    print(f"[INFO] Average RMS Energy: {avg_rms:.5f}", file=sys.stderr)

    # Step 3: Compute pitch variation
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = pitches[magnitudes > np.median(magnitudes)]
    pitch_values = pitch_values[pitch_values > 0]

    if len(pitch_values) == 0:
        pitch_std = 0.0
    else:
        pitch_std = float(np.nanstd(pitch_values))

    print(f"[INFO] Pitch Variation (std dev): {pitch_std:.2f}", file=sys.stderr)

    # Step 4: Classify energy level
    if avg_rms > 0.04 and pitch_std > 30:
        energy_label = "High Energy"
    elif avg_rms < 0.015:
        energy_label = "Low Energy"
    else:
        energy_label = "Moderate Energy"

    print(f"[INFO] Energy Level: {energy_label}", file=sys.stderr)

    # Optional RMS plot
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


def load_audio(audio_file_path):
    """
    Loads the audio file using librosa and returns the waveform and sample rate.

    Args:
        audio_file_path (str): Path to the .wav file

    Returns:
        tuple: (waveform np.ndarray, sample rate)
    """
    y, sr = librosa.load(audio_file_path, sr=None)
    return y, sr


def analyze_pitch(y, sr):
    """
    Extracts pitch values using librosa's piptrack.

    Args:
        y (np.ndarray): Audio signal
        sr (int): Sample rate

    Returns:
        list: List of pitch values
    """
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_values = []

    for t in range(pitches.shape[1]):
        index = magnitudes[:, t].argmax()
        pitch = pitches[index, t]
        pitch_values.append(pitch if pitch > 0 else np.nan)

    return pitch_values


def analyze_loudness(y, sr, hop_length=512):
    """
    Computes Root Mean Square (RMS) loudness over time.

    Args:
        y (np.ndarray): Audio signal
        sr (int): Sample rate
        hop_length (int): Frame size

    Returns:
        tuple: (rms values, time axis)
    """
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    time_rms = librosa.times_like(rms, sr=sr, hop_length=hop_length)
    return rms, time_rms


# 🔧 Run directly for debug/plotting
if __name__ == "__main__":
    sample_path = "./plots/output.wav"
    results = compute_energy_level(sample_path, plot=True)

    print("\n Final Energy Metrics:", file=sys.stderr)
    print(f"   RMS Energy     : {results['avg_rms']:.5f}", file=sys.stderr)
    print(f"   Pitch Variation: {results['pitch_variation']:.2f}", file=sys.stderr)
    print(f"   Energy Level   : {results['energy_level']}", file=sys.stderr)
