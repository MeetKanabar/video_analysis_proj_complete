import librosa
import speech_recognition as sr
from termcolor import colored

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
    duration_minutes = duration_seconds / 60
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
    # Step 1: Transcribe
    try:
        text = audio_to_text(audio_path)
    except Exception as e:
        print(colored(f"❌ Error transcribing: {e}", 'red'))
        return None

    # Step 2: Duration
    y, sr = librosa.load(audio_path, sr=None)
    duration_seconds = len(y) / sr

    # Step 3: WPM calculation
    wpm = calculate_wpm(text, duration_seconds)

    # Step 4: Output
    if verbose:
        print("\n⏱️ Speech Speed Analysis")
        print("-" * 30)
        print(colored(f"🗣️ Transcribed Text:\n{text}\n", 'cyan'))
        print(f"🕒 Duration: {duration_seconds:.2f} seconds")
        print(f"📏 Words per Minute (WPM): {wpm:.2f}")

        print("\n🎯 Feedback:")
        if wpm < target_wpm - 20:
            print(colored("⚠️ You are speaking too slowly. Try increasing your pace.", 'yellow'))
        elif wpm > target_wpm + 20:
            print(colored("⚠️ You are speaking too fast. Slow down to improve clarity.", 'yellow'))
        else:
            print(colored("✅ Your speech pace is optimal!", 'green'))

    return {
        "wpm": round(wpm, 2),
        "duration_sec": round(duration_seconds, 2),
        "transcribed_text": text,
    }

# ✅ Run standalone for testing
if __name__ == "__main__":
    test_path = "./audio_samples/sample.wav"  # Replace with actual file
    analyze_speech_speed(test_path)
