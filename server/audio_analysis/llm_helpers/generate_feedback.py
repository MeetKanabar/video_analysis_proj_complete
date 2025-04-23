import google.generativeai as genai
import json
import sys
import os
import re


# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyD0cCbmyhXufYBpdrkjNE5-aaGBFjFKvm0")
genai.configure(api_key=GEMINI_API_KEY)

def generate_structured_feedback(analysis_result):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")

        prompt = (
            "You are a public speaking coach. Based on the following analysis, generate clear and concise feedback for each section.\n\n"
            "Please respond ONLY in the following JSON format:\n"
            "{\n"
            '  "transcription_feedback": "...",\n'
            '  "pause_feedback": "...",\n'
            '  "speed_feedback": "...",\n'
            '  "energy_feedback": "...",\n'
            '  "pitch_feedback": "...",\n'
            '  "emotion_feedback": "...",\n'
            '  "paraphrase_feedback": "..." \n'
            "}\n\n"
            "The feedback should be:\n"
            "- 1-2 short sentences per section\n"
            "- Positive and constructive\n"
            "- Focused on improvement\n"
            "- Suitable for a student practicing public speaking\n\n"
            "Here is the data:\n"
            f"{json.dumps(analysis_result, indent=2)}"
        )

        response = model.generate_content(
            contents=[{"role": "user", "parts": [prompt]}],
            generation_config={
                "temperature": 0.7,
                "top_p": 1,
                "max_output_tokens": 512
            }
        )

        output = response.text.strip()


        # Extract JSON using regex (finds first valid JSON block)
        match = re.search(r"{.*}", output, re.DOTALL)
        if not match:
            raise ValueError("No valid JSON object found in response.")

        feedback_json = json.loads(match.group(0))


        return feedback_json

    except Exception as e:
        print(f"❌ Feedback generation failed: {type(e).__name__} - {e}", file=sys.stderr)
        return None

# Example usage
if __name__ == "__main__":
    with open("./audio_analysis/llm_helpers/analysis_sample.json", "r") as f:
        analysis = json.load(f)

    feedback = generate_structured_feedback(analysis)
    print(json.dumps(feedback, indent=2))
