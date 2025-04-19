from collections import Counter

# 🔹 Common filler words list
FILLER_WORDS = [
    "um", "uh", "umm", "you know", "like", "actually", "basically",
    "so", "i mean", "right", "well", "okay", "hmm"
]

def analyze_filler_words(text, verbose=True):
    """
    Analyzes the number and frequency of filler words in a given transcript.

    Args:
        text (str): The full transcribed text from speech.
        verbose (bool): If True, prints a breakdown to the console.

    Returns:
        dict: {
            "total_fillers": int,
            "counts": dict
        }
    """
    words = text.lower().split()
    filler_counts = Counter(word for word in words if word in FILLER_WORDS)
    total_fillers = sum(filler_counts.values())

    if verbose:
        print("\n🔍 Filler Word Analysis")
        print("-" * 30)
        if total_fillers == 0:
            print("✅ No filler words detected. Great clarity!")
        else:
            for word, count in filler_counts.items():
                print(f"🔸 '{word}': {count} time(s)")
            print(f"🧮 Total Filler Words: {total_fillers}")

    return {
        "total_fillers": total_fillers,
        "counts": dict(filler_counts)
    }


# ✅ Test runner
if __name__ == "__main__":
    sample_text = """
        So, um, I was like trying to explain this thing, you know, and uh,
        basically it just didn’t work out. Right? I mean, hmm, okay.
    """
    result = analyze_filler_words(sample_text)
    print("\n📊 Summary:", result)
