import pyaudio
import wave

def record_audio(duration, filename):
    chunk = 1024  # Buffer size
    sample_format = pyaudio.paInt16  # 16 bits per sample
    channels = 1  # Mono
    fs = 44100  # Sample rate

    p = pyaudio.PyAudio()

    print("Recording...")
    stream = p.open(format=sample_format, channels=channels, rate=fs, input=True, frames_per_buffer=chunk)

    frames = []

    for _ in range(0, int(fs / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()
    print("Recording complete.")

    # Save the recorded data as a .wav file
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(p.get_sample_size(sample_format))
        wf.setframerate(fs)
        wf.writeframes(b''.join(frames))

def main():
    duration = 5  # Record for 5 seconds
    filename = "output.wav"
    
    # Call the function to record audio
    record_audio(duration, filename)
    
    print(f"Audio saved as '{filename}'. You can download it from your current directory.")

if __name__ == "__main__":
    main()
