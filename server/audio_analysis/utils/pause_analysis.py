import librosa

def analyze_pauses(audio_path, pause_threshold=0.5, verbose=True):
    """
    Analyze pauses in the audio file.

    Args:
        audio_path (str): Path to the audio file.
        pause_threshold (float): Duration in seconds to consider a pause as 'long'.
        verbose (bool): Whether to print feedback to the console.

    Returns:
        dict: {
            "long_pauses": int,
            "short_pauses": int,
            "total_long_duration": float,
            "total_short_duration": float
        }
    """
    y, sr = librosa.load(audio_path)
    intervals = librosa.effects.split(y, top_db=30)

    short_pauses = 0
    long_pauses = 0
    total_short_duration = 0.0
    total_long_duration = 0.0

    for i in range(1, len(intervals)):
        prev_end = intervals[i - 1][1] / sr
        curr_start = intervals[i][0] / sr
        pause_duration = curr_start - prev_end

        if pause_duration > pause_threshold:
            long_pauses += 1
            total_long_duration += pause_duration
        else:
            short_pauses += 1
            total_short_duration += pause_duration

    result = {
        "long_pauses": long_pauses,
        "short_pauses": short_pauses,
        "total_long_duration": round(total_long_duration, 2),
        "total_short_duration": round(total_short_duration, 2),
    }

    if verbose:
        print("\n🧘 Pause Analysis")
        print("-" * 30)
        print(f"🔹 Long Pauses (> {pause_threshold}s): {long_pauses} pauses totaling {total_long_duration:.2f} seconds")
        print(f"🔸 Short Pauses (<= {pause_threshold}s): {short_pauses} pauses totaling {total_short_duration:.2f} seconds")
        print("\n🎯 Insights:")
        if long_pauses > 5:
            print("🗣️ Consider reducing long pauses to maintain flow.")
        elif short_pauses < 3:
            print("⏸️ You might benefit from a few well-placed pauses for clarity.")
        else:
            print("✅ Good pacing detected.")

    return result


# ✅ Standalone test runner
if __name__ == "__main__":
    sample_path = "./audio_samples/sample.wav"  # Replace this with your test audio
    analyze_pauses(sample_path)
