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
        model = genai.GenerativeModel("gemini-2.0-flash")

        prompt = (
            f"Paraphrase the following sentence in 5 different ways. "
            f"Respond ONLY with the fiveraphrased sentences, one per line, without numbers or bullets:\n\n{text}"
        )

        response = model.generate_content(
            contents=[{"role": "user", "parts": [prompt]}],
            generation_config={
                "temperature": 0.7,
                "top_p": 1,
                "max_output_tokens": 256
            }
        )

        raw_output = response.text.strip()

        # Extract clean lines
        options = [line.strip() for line in raw_output.split("\n") if line.strip()]

        return {
            "type": "list" if len(options) > 1 else "single",
            "options": options
        }

    except Exception as e:
        print(f" Paraphrasing failed: {type(e).__name__} - {e}", file=sys.stderr)
        return None


# Test runner
if __name__ == "__main__":
    text = "My name is Naomi. I am a software engineer. I love coding and solving problems."
    result = paraphrase_text(text)
    print(json.dumps({"paraphrased": result}))


