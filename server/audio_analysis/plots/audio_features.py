import matplotlib.pyplot as plt
import librosa
import numpy as np
import seaborn as sns

def plot_audio_features(y, sr, pitch_values, rms, time_rms, save_path=None):
    """
    Plots pitch and loudness (RMS) over time and optionally saves the plot to disk.

    Args:
        y (np.ndarray): Audio time series.
        sr (int): Sampling rate.
        pitch_values (list): List of pitch values over time.
        rms (np.ndarray): Root Mean Square loudness values.
        time_rms (np.ndarray): Time axis corresponding to RMS values.
        save_path (str): If provided, saves the plot image to this path.
    """
    sns.set(style="whitegrid")
    times = librosa.times_like(y, sr=sr)

    fig, axes = plt.subplots(2, 1, figsize=(14, 8))

    # Pitch plot
    axes[0].plot(times[:len(pitch_values)], pitch_values, color='#3498db', linewidth=1.5, label="Pitch")
    axes[0].fill_between(times[:len(pitch_values)], pitch_values, color='#b3cde3', alpha=0.3)
    axes[0].set_title("Pitch Over Time", fontsize=16, fontweight="bold")
    axes[0].set_ylabel("Pitch (Hz)")
    axes[0].legend()
    axes[0].grid(True)

    # Loudness (RMS) plot
    axes[1].plot(time_rms, rms, color='#e74c3c', linewidth=1.5, label="Loudness (RMS)")
    axes[1].fill_between(time_rms, rms, color='#f4cccc', alpha=0.4)
    axes[1].set_title("Loudness Over Time", fontsize=16, fontweight="bold")
    axes[1].set_xlabel("Time (s)")
    axes[1].set_ylabel("RMS")
    axes[1].legend()
    axes[1].grid(True)

    plt.tight_layout()

    if save_path:
        plt.savefig(save_path)
        print(f"📁 Plot saved to: {save_path}")
    else:
        plt.show()

