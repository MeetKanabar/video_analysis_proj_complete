import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# ✅ Use hardcoded key for now (but keep .env option if needed)
GEMINI_API_KEY = "AIzaSyD0cCbmyhXufYBpdrkjNE5-aaGBFjFKvm0"
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# 💡 Criteria descriptions used to build the prompt
CRITERIA_EXPLANATIONS = {
    "structure": "Analyze if the text has a clear introduction, body, and conclusion. Mention logical flow and transitions.",
    "style": "Comment on the tone (e.g., formal, persuasive) and stylistic consistency.",
    "grammar": "Check for grammatical errors, sentence complexity, and passive voice.",
    "keywords": "Highlight use of filler words, jargon, and suggest alternatives.",
    "readability": "Provide Flesch score and explain what it is, word complexity, and sentence length observations."
}

def build_gemini_prompt(text: str, parameters: list[str]) -> str:
    selected_explanations = [CRITERIA_EXPLANATIONS[p] for p in parameters if p in CRITERIA_EXPLANATIONS]

    example_json = """
Return your response ONLY in this JSON format:
{
  "structure": "Good flow, but lacks a clear conclusion.",
  "style": "Tone is casual and consistent.",
  "grammar": "Minor grammatical issues detected.",
  "keywords": "Avoid words like 'very' and 'really'.",
  "readability": {
    "description": "The Flesch Reading Ease score assesses the readability of text; higher scores indicate easier readability.",
    "word_complexity": "The words used are relatively simple and common.",
    "sentence_length": "The sentences are short, contributing to the text's ease of understanding."
  }
}
"""

    prompt = f"""
You are a critical writing assistant. A user has written the following text and wants feedback:

\"\"\"{text}\"\"\"

Evaluate only the following aspects (if listed):
- {'; '.join(selected_explanations)}

Only include fields for the parameters selected.
Be objective. Do NOT assume correctness if it isn't clear.

{example_json}
""".strip()

    return prompt

def analyze_text_with_gemini(text: str, parameters: list[str]) -> dict:
    if not text or not parameters:
        raise ValueError("Text and list of parameters are required.")

    prompt = build_gemini_prompt(text, parameters)

    # 🔍 Generate Gemini response
    response = model.generate_content(
        contents=[{"role": "user", "parts": [prompt]}],
        generation_config={
            "temperature": 0.3,  # Less hallucination, more consistency
            "top_p": 1,
            "max_output_tokens": 512
        }
    )

    # 🧹 Clean and validate response
    cleaned_response = (
        response.text
        .strip()
        .removeprefix("```json")
        .removeprefix("```")
        .removesuffix("```")
        .strip()
    )

    try:
        return json.loads(cleaned_response)
    except json.JSONDecodeError as e:
        raise ValueError(f"Gemini returned invalid JSON:\n\n{cleaned_response}")

# 🚀 Example usage
if __name__ == "__main__":
    sample_text = "Me go to store yesterday but not buy nothing because I forget wallet and I walking back sad."
    selected_parameters = ["structure", "style", "grammar", "keywords", "readability"]

    try:
        feedback = analyze_text_with_gemini(sample_text, selected_parameters)
        print(json.dumps(feedback, indent=2))
    except Exception as e:
        print(f"❌ Error: {e}")
