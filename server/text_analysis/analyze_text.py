import os
import json
import google.generativeai as genai
import sys

# Load environment variable from .env
GEMINI_API_KEY = "AIzaSyD0cCbmyhXufYBpdrkjNE5-aaGBFjFKvm0"

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Criteria explanations used for prompt generation
CRITERIA_EXPLANATIONS = {
    "structure": "Analyze if the text has a clear introduction, body, and conclusion. Mention logical flow and transitions.",
    "style": "Comment on the tone (e.g., formal, persuasive) and stylistic consistency.",
    "grammar": "Check for grammatical errors, sentence complexity, and passive voice.",
    "keywords": "Highlight use of filler words, jargon, and suggest alternatives.",
    "readability": "Calculate and return the Flesch Reading Ease score (a number between 0 and 100), then explain what it means. Also evaluate word complexity and sentence length."
}


def build_gemini_prompt(text: str, parameters: list[str]) -> str:
    example_original = "Me go to store yesterday but not buy nothing because forget money at home."
    example_corrected = "I went to the store yesterday but didn’t buy anything because I forgot my money at home."

    criteria_explanations = {
        "structure": "Comment on how well the text is organized (intro/body/conclusion or event flow).",
        "style": "Evaluate tone and stylistic consistency.",
        "grammar": "Check for grammar errors and explain how to fix them.",
        "keywords": "Comment on filler word/jargon usage and improvement suggestions.",
        "readability": "Give Flesch Reading Ease score, sentence length, and word complexity feedback."
    }

    selected_explanations = [criteria_explanations[p] for p in parameters if p in criteria_explanations]

    example_json = """
Example JSON format:
{
  "structure": {
    "issue": "The sentence lacks formal structure, which is okay for short narratives, but not ideal.",
    "correction": "Use structured storytelling: start with time/place, action, outcome."
  },
  "style": {
    "issue": "Tone is informal and lacks professionalism.",
    "correction": "Use complete sentences and appropriate tone for your audience."
  },
  "grammar": {
    "issues": [
      {
        "error": "Me go",
        "correction": "I went",
        "rule": "Subject-verb agreement"
      },
      {
        "error": "not buy nothing",
        "correction": "didn’t buy anything",
        "rule": "Double negative"
      },
      {
        "error": "forget money",
        "correction": "forgot my money",
        "rule": "Verb tense and possessive pronoun"
      }
    ]
  },
  "keywords": {
    "issue": "No filler or jargon words detected.",
    "correction": "No improvement needed in keyword usage."
  },
  "readability": {
    "flesch_score": 95,
    "description": "Very easy to read.",
    "word_complexity": "Simple and common vocabulary.",
    "sentence_length": "Short sentence.",
    "correction": "None needed."
  },
  "original_text": "Me go to store yesterday but not buy nothing because forget money at home.",
  "corrected_text": "I went to the store yesterday but didn’t buy anything because I forgot my money at home.",
}
"""

    prompt = f"""
You are a writing assistant. Here is a reference example for how you should analyze and return feedback:

Example Input:
\"\"\"{example_original}\"\"\"

Corrected Version:
\"\"\"{example_corrected}\"\"\"

Reference Feedback Format:
{example_json}

Now analyze this new input using the same format.

Input to Analyze:
\"\"\"{text}\"\"\"

Evaluate only the following areas:
- {'; '.join(selected_explanations)}

Return a **valid JSON object only** with keys matching the selected categories. No explanation outside the JSON block.
""".strip()

    return prompt


def analyze_text_with_gemini(text: str, parameters: list[str]) -> dict:
    if not text or not parameters:
        raise ValueError("Text and list of parameters are required.")
    prompt = build_gemini_prompt(text, parameters)

    response = model.generate_content(
        contents=[{"role": "user", "parts": [prompt]}],
        generation_config={
            "temperature": 0.7,
            "top_p": 1,
            "max_output_tokens": 1024
        }
    )

    cleaned_response = response.text.strip().strip("```").strip("json").strip()

    try:
        return json.loads(cleaned_response)
    except json.JSONDecodeError:
        raise ValueError(f"Gemini returned an invalid JSON response: {response.text}")


def main():
    if len(sys.argv) != 2:
        print("Usage: python analyze_text.py <text_to_analyze>")
        sys.exit(1)

    text_to_analyze = sys.argv[1]

    parameters = ["structure", "style", "grammar", "keywords", "readability"]

    try:
        # Analyze the text using Gemini
        feedback = analyze_text_with_gemini(text_to_analyze, parameters)
        print(json.dumps(feedback, indent=2))  # Print feedback in JSON format
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


# Calling the main function if the script is executed directly
if __name__ == "__main__":
    main()
