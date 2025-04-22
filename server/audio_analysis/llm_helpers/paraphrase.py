import google.generativeai as genai
import sys
import json
import re

# Replace with your real API key
GEMINI_API_KEY = "AIzaSyD0cCbmyhXufYBpdrkjNE5-aaGBFjFKvm0"
genai.configure(api_key=GEMINI_API_KEY)


def clean_and_format(text):
    # Clean & split only up to 5 lines
    lines = re.split(r'[\n•*]+\s*', text.strip())
    lines = [line.strip("-•* ").strip() for line in lines if line.strip()]

    # If it returned a single paragraph with sentences
    if len(lines) == 1 and lines[0].count('.') >= 5:
        sentences = re.split(r'\.\s+', lines[0])
        lines = [s.strip() + "." for s in sentences if s.strip()]
    
    lines = lines[:5]  # Cap to 5

    return {
        "type": "list" if len(lines) > 1 else "single",
        "options": lines
    }


def paraphrase_text(text):
    try:
        print(f"🔹 Original Text: {text}", file=sys.stderr)

        model = genai.GenerativeModel("gemini-2.0-flash")

        response = model.generate_content(
            contents=[{"role": "user", "parts": [f"Paraphrase the following text into 5 different short and fluent English sentences. Keep the meaning same but vary the structure and words:\n\n{text}"
]}],
            generation_config={
                "temperature": 0.7,
                "top_p": 1,
                "max_output_tokens": 256
            }
        )

        return response.text.strip() if hasattr(response, "text") else "[No output generated]"

    except Exception as e:
        print(f"❌ Paraphrasing failed: {type(e).__name__} - {e}", file=sys.stderr)
        return None

# Test runner
if __name__ == "__main__":
    text = "I am cricket playing and I love it"
    raw_output = paraphrase_text(text)
    formatted = clean_and_format(raw_output)
    print(json.dumps({"paraphrased": formatted}))

