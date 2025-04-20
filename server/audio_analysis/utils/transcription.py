import speech_recognition as sr
from termcolor import colored

def transcribe_audio(file_path, verbose=True):
    """
    Transcribes speech from an audio file using Google's Web Speech API.

    Args:
        file_path (str): Path to the audio file (.wav recommended)
        verbose (bool): Print the output

    Returns:
        str: Transcribed text from the audio
    """
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(file_path) as source:
            audio = recognizer.record(source)
        transcription = recognizer.recognize_google(audio)

        if verbose:
            print("\n📝 Transcription Result")
            print("-" * 30)
            print(colored(transcription, 'cyan'))

        return transcription

    except sr.UnknownValueError:
        print(colored("❌ Could not understand the audio.", 'red'))
        return None
    except sr.RequestError as e:
        print(colored(f"❌ Could not request results; {e}", 'red'))
        return None
    except Exception as e:
        print(colored(f"❌ Unexpected error: {e}", 'red'))
        return None

# ✅ Test independently
if __name__ == "__main__":
    test_path = "./audio_samples/sample.wav"  # Replace with a test file
    transcribe_audio(test_path)
