import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"  # Suppress TensorFlow logs
import numpy as np
import librosa
import librosa.display
import soundfile as sf
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.models import model_from_json, Sequential
import pickle
from tensorflow.keras.layers import Conv1D, BatchNormalization, InputLayer
from sklearn.preprocessing import OneHotEncoder
import warnings
import json
import sys
warnings.filterwarnings("ignore")

# Load Model
with open("modelRequirements/CNN_model.json", "r") as json_file:
    model_json = json_file.read()
custom_objects = {
    "Sequential": Sequential,
    "Conv1D": Conv1D,
    "BatchNormalization": BatchNormalization,
    "InputLayer": InputLayer
}
loaded_model = model_from_json(model_json, custom_objects=custom_objects)
loaded_model.load_weights("modelRequirements/CNN_model_weights.h5")

# Load Scaler and Encoder
with open("modelRequirements/scaler2.pickle", "rb") as f:
    scaler2 = pickle.load(f)
with open("modelRequirements/encoder2_fixed (1).pickle", "rb") as f:
    encoder2 = pickle.load(f)

# Feature extraction functions
def zcr(data, frame_length, hop_length):
    return np.squeeze(librosa.feature.zero_crossing_rate(data, frame_length=frame_length, hop_length=hop_length))

def rmse(data, frame_length=2048, hop_length=512):
    return np.squeeze(librosa.feature.rms(y=data, frame_length=frame_length, hop_length=hop_length))

def mfcc(data, sr, flatten=True):
    mfcc_feat = librosa.feature.mfcc(y=data, sr=sr)
    return np.ravel(mfcc_feat.T) if flatten else np.squeeze(mfcc_feat.T)

def extract_features(data, sr=22050, frame_length=2048, hop_length=512):
    features = np.hstack([
        zcr(data, frame_length, hop_length),
        rmse(data, frame_length, hop_length),
        mfcc(data, sr)
    ])
    return features

def get_predict_feat(data, sr=22050, frame_length=2048, hop_length=512):
    features = extract_features(data, sr, frame_length, hop_length)
    target_length = 2376
    if len(features) < target_length:
        features = np.pad(features, (0, target_length - len(features)), mode='constant')
    elif len(features) > target_length:
        features = features[:target_length]
    features = scaler2.transform([features])
    return np.expand_dims(features, axis=2)

# Prediction function
def predict_emotion(segment_path):
    data, sr = librosa.load(segment_path, sr=None)
    segment_length = 5 * sr  # 5 seconds
    emotions = []
    time_marker = 0

    for start in range(0, len(data), segment_length):
        end = start + segment_length
        segment = data[start:end]
        if len(segment) < segment_length:
            segment = np.pad(segment, (0, segment_length - len(segment)), mode='constant')
        features = get_predict_feat(segment, sr)
        predictions = loaded_model.predict(features)
        emotion = encoder2.inverse_transform(predictions)
        emotions.append({
            "time": int(time_marker),
            "emotion": emotion[0][0]
        })
        time_marker += 5

    # Extract primary and secondary emotions
    all_emotions = [e["emotion"] for e in emotions]
    counts = {e: all_emotions.count(e) for e in set(all_emotions)}
    sorted_emotions = sorted(counts.items(), key=lambda x: x[1], reverse=True)
    primary = sorted_emotions[0][0]
    secondary = sorted_emotions[1][0] if len(sorted_emotions) > 1 else None

    output = {
        "primary": primary,
        "secondary": secondary,
        "data": emotions,
        "feedback": f"You maintain a {primary.lower()} tone across most of your speech. This typically reflects {'positive energy' if primary in ['happy', 'surprise'] else 'neutral control' if primary == 'neutral' else 'a need to soften your delivery'}. Use the emotion chart below to reflect on your expressive shifts throughout the talk."
    }

    return json.dumps({ "emotion": output }, indent=2)


if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            raise ValueError("No audio file path provided.")
        file_path = sys.argv[1]
        print(predict_emotion(file_path))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
