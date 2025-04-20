import os
import sys
from groq import Groq

# Setup
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")
client = Groq(api_key=GROQ_API_KEY)

def paraphrase_text(text, model="llama3-8b-8192", temperature=0.7):
    """
    Uses Groq-hosted LLaMA 3 model to paraphrase input text.
    Returns the full paraphrased string.
    """
    try:
        print(f"🔹 Original Text: {text}", file=sys.stderr)

        messages = [
            {
                "role": "system",
                "content": "You are a helpful assistant that rewrites user input with different structure and vocabulary while keeping the same meaning. Keep it fluent and natural."
            },
            {
                "role": "user",
                "content": f"Paraphrase this: {text}"
            }
        ]

        stream = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=256,
            top_p=1,
            stream=True
        )

        final_output = ""
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta:
                content = chunk.choices[0].delta.content
                if content:
                    final_output += content

        return final_output.strip()

    except Exception as e:
        print(f"❌ Paraphrasing failed: {type(e).__name__} - {e}", file=sys.stderr)
        return None


if __name__ == "__main__":
    import json
    test_input = "The weather is great for a walk in the park today."
    output = paraphrase_text(test_input)
    print(json.dumps({ "paraphrased": output }))
