import os
import json
import google.generativeai as genai
import sys

# Load API Key
GEMINI_API_KEY = "AIzaSyD0cCbmyhXufYBpdrkjNE5-aaGBFjFKvm0"

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

def build_gemini_prompt(text: str) -> str:
    example_json = """
{
  "structure": {
    "issue": "Your structure lacks logical flow between sections.",
    "correction": "Use clearer transitions between paragraphs and organize ideas better."
  },
  "style": {
    "issue": "Writing style is too formal for the intended audience.",
    "correction": "Simplify the language and make it more conversational."
  },
  "grammar": {
    "issues": [
      {
        "error": "Their going to the store.",
        "correction": "They're going to the store.",
        "rule": "Confusion between 'their' and 'they're'."
      }
    ]
  },
  "keywords": {
    "issue": "Key ideas are not clearly emphasized.",
    "correction": "Highlight important points using stronger keywords.",
    "fillerWords": {
      "like": 3,
      "basically": 2
    },
    "repeatedWords": {
      "important": 5,
      "really": 3
    }
  },
  "readability": {
    "score": 72,
    "level": "Standard",
    "wordComplexity": "Moderate",
    "sentenceLength": "Medium",
    "flesch_score": 8.3,
    "sentence_length": 14,
    "word_complexity": 0.45,
    "correction": "The Flesch Reading Ease Score is 72, which is considered 'Standard'. To improve clarity, use simpler words and shorten complex sentences."
  },
  "summary": {
    "positivePoints": [
      "Good vocabulary usage."
    ],
    "improvements": [
      "Reduce filler words."
    ]
  }
}
"""

    prompt = f"""
You are a strict academic writing assistant.

Analyze the text below for the following areas:
- Structure
- Style
- Grammar (be exhaustive: include tense, punctuation, capitalization, fragments, informal phrases)
- Keywords (clarity, filler and repeated word analysis)
- Readability (Flesch Reading Ease, complexity, level, sentence length)

Return output strictly in the following JSON format:

{example_json}

RULES:
- In the 'readability.correction' field, ALWAYS explain the Flesch Reading Ease score and how to improve it.
- If any value is missing, use:
  - "N/A" for strings
  - 0 for numbers
  - [] for arrays
  - {{}} for objects
- Do NOT include any text outside the JSON. No markdown, no code blocks.
- Output must be a pure, parsable JSON object.

Input Text:
\"\"\"{text}\"\"\"
""".strip()

    return prompt


def analyze_text_with_gemini(text: str) -> dict:
    if not text:
        raise ValueError("Text to analyze is required.")

    prompt = build_gemini_prompt(text)

    response = model.generate_content(
        contents=[{"role": "user", "parts": [prompt]}],
        generation_config={
            "temperature": 0.3,
            "top_p": 1,
            "max_output_tokens": 1500
        }
    )

    cleaned_response = response.text.strip().strip("```").strip("json").strip()

    try:
        parsed = json.loads(cleaned_response)
        return fill_missing_fields(parsed)
    except json.JSONDecodeError as e:
        raise ValueError(f"Gemini returned invalid JSON: {e}")

def fill_missing_fields(data: dict) -> dict:
    # Fill missing fields if Gemini skips anything
    return {
        "structure": {
            "issue": data.get("structure", {}).get("issue", "N/A"),
            "correction": data.get("structure", {}).get("correction", "N/A")
        },
        "style": {
            "issue": data.get("style", {}).get("issue", "N/A"),
            "correction": data.get("style", {}).get("correction", "N/A")
        },
        "grammar": {
            "issues": data.get("grammar", {}).get("issues", [])
        },
        "keywords": {
            "issue": data.get("keywords", {}).get("issue", "N/A"),
            "correction": data.get("keywords", {}).get("correction", "N/A"),
            "fillerWords": data.get("keywords", {}).get("fillerWords", {}),
            "repeatedWords": data.get("keywords", {}).get("repeatedWords", {})
        },
        "readability": {
            "score": data.get("readability", {}).get("score", 0),
            "level": data.get("readability", {}).get("level", "N/A"),
            "wordComplexity": data.get("readability", {}).get("wordComplexity", "N/A"),
            "sentenceLength": data.get("readability", {}).get("sentenceLength", "N/A"),
            "flesch_score": data.get("readability", {}).get("flesch_score", 0),
            "sentence_length": data.get("readability", {}).get("sentence_length", 0),
            "word_complexity": data.get("readability", {}).get("word_complexity", 0),
            "correction": data.get("readability", {}).get("correction", "N/A")
        },
        "summary": {
            "positivePoints": data.get("summary", {}).get("positivePoints", []),
            "improvements": data.get("summary", {}).get("improvements", [])
        }
    }

def main():
    if len(sys.argv) != 2:
        print("Usage: python analyze_text.py \"<text_to_analyze>\"")
        sys.exit(1)

    text_to_analyze = sys.argv[1]

    try:
        feedback = analyze_text_with_gemini(text_to_analyze)
        print(json.dumps(feedback, indent=2))
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
