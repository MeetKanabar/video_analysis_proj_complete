import sys
import json
import os
from gtts import gTTS
from nltk.corpus import wordnet as wn
from nltk.corpus import words

def process_word(word):
    # Validate word existence using nltk's word list
    nltk_words = set(words.words())
    if word.lower() not in nltk_words:
        return {"error": f"Sorry, the word '{word}' was not found in the dictionary."}

    # Ensure a directory for audio files exists
    audio_dir = "pronunciations"  # Updated directory name
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)
    
    # Convert text to speech and save the pronunciation audio
    audio_path = os.path.join(audio_dir, f"{word}.mp3")
    tts = gTTS(text=word, lang='en')
    tts.save(audio_path)
    
    # Fetch definitions, synonyms, antonyms, and example sentences from WordNet
    synsets = wn.synsets(word)
    definitions = []
    synonyms = set()
    antonyms = set()
    examples = []

    if synsets:
        for i, syn in enumerate(synsets, 1):
            # Get definition and examples for each sense of the word
            definitions.append(syn.definition())
            examples.extend(syn.examples())

            # Collect synonyms and antonyms
            for lemma in syn.lemmas():
                synonyms.add(lemma.name())
                if lemma.antonyms():
                    antonyms.add(lemma.antonyms()[0].name())
    else:
        return {"error": f"Sorry, no definition found for '{word}'."}

    # Convert sets to lists and remove duplicates
    synonyms = list(synonyms)
    antonyms = list(antonyms)

    return {
        "word": word,
        "audio": f"/pronunciations/{word}.mp3",  # Updated path
        "definitions": definitions,
        "synonyms": synonyms,
        "antonyms": antonyms,
        "examples": examples
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No word provided"}))
    else:
        word = sys.argv[1].strip()
        result = process_word(word)
        print(json.dumps(result))