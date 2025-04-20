import speech_recognition as sr
import sys
import json

def transcribe_audio(file_path, verbose=True):
    """
    Transcribes speech from an audio file using Google's Web Speech API.

    Args:
        file_path (str): Path to the audio file (.wav recommended)
        verbose (bool): Print output to stderr

    Returns:
        str: Transcribed text from the audio
    """
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(file_path) as source:
            audio = recognizer.record(source)
        transcription = recognizer.recognize_google(audio)

        if verbose:
            print("\n[Transcription Result]", file=sys.stderr)
            print("-" * 30, file=sys.stderr)
            print(transcription, file=sys.stderr)

        return transcription

    except sr.UnknownValueError:
        print(json.dumps({"error": "Could not understand the audio."}))
        sys.exit(1)

    except sr.RequestError as e:
        print(json.dumps({"error": f"Speech recognition API error: {str(e)}"}))
        sys.exit(1)

    except Exception as e:
        print(json.dumps({"error": f"Unexpected error: {str(e)}"}))
        sys.exit(1)


# ✅ Optional standalone runner
if __name__ == "__main__":
    test_path = "./audio_samples/sample.wav"  # Replace with a valid path
    result = transcribe_audio(test_path)
    if result:
        print(json.dumps({"transcription": result}))
