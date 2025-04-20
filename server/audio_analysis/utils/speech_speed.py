import librosa
import speech_recognition as sr

def audio_to_text(file_path):
    """
    Transcribes audio to text using Google Speech Recognition.
    """
    recognizer = sr.Recognizer()
    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text

def calculate_wpm(text, duration_seconds):
    """
    Calculates words per minute.
    """
    word_count = len(text.split())
    duration_minutes = duration_seconds / 60 if duration_seconds > 0 else 1
    return word_count / duration_minutes

def analyze_speech_speed(audio_path, target_wpm=150, verbose=True):
    """
    Analyzes speech rate and compares it with a target WPM.

    Args:
        audio_path (str): Path to the audio file.
        target_wpm (int): Ideal speaking rate.
        verbose (bool): Whether to print output.

    Returns:
        dict: {
            "wpm": float,
            "duration_sec": float,
            "transcribed_text": str
        }
    """
    try:
        text = audio_to_text(audio_path)
    except Exception as e:
        print(f"[Error] Could not transcribe audio: {e}")
        return {
            "wpm": 0.0,
            "duration_sec": 0.0,
            "transcribed_text": ""
        }

    y, sr = librosa.load(audio_path, sr=None)
    duration_seconds = len(y) / sr if sr else 0
    wpm = calculate_wpm(text, duration_seconds)

    if verbose:
        print("\n[Speech Speed Analysis]")
        print("-" * 30)
        print(f"Transcribed Text:\n{text}\n")
        print(f"Duration        : {duration_seconds:.2f} seconds")
        print(f"Words per Minute: {wpm:.2f}")

        print("Feedback:")
        if wpm < target_wpm - 20:
            print("You are speaking slowly. Try increasing your pace.")
        elif wpm > target_wpm + 20:
            print("You are speaking fast. Consider slowing down for clarity.")
        else:
            print("Your speaking pace is within an optimal range.")

    return {
        "wpm": round(wpm, 2),
        "duration_sec": round(duration_seconds, 2),
        "transcribed_text": text,
    }

# ✅ Run standalone for testing
if __name__ == "__main__":
    test_path = "./audio_samples/sample.wav"
    analyze_speech_speed(test_path)
