import os
from openai import OpenAI
import requests

# Setup
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")

client = OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=GROQ_API_KEY,
)

def paraphrase_text(text, model="llama3-8b-8192", temperature=0.7):
    """
    Uses Groq-hosted LLaMA 3 model to paraphrase input text.
    """
    try:
        print("🔹 Original Text:", text)
        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that rewrites user input with different structure and vocabulary while keeping the same meaning. Keep it fluent and natural."
                },
                {"role": "user", "content": f"Paraphrase this: {text}"}
            ],
            temperature=temperature,
            max_tokens=256
        )
        output = response.choices[0].message.content.strip()
        print("✅ Paraphrased:", output)
        return output

    except Exception as e:
        print(f"❌ Paraphrasing failed: {type(e).__name__} - {e}")
        return None

# Test
if __name__ == "__main__":
    test = "The weather is great for a walk in the park today."
    paraphrase_text(test)


# import requests

# GROQ_API_KEY = "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"
# headers = {
#     "Authorization": f"Bearer {GROQ_API_KEY}"
# }

# r = requests.get("https://api.groq.com/openai/v1/models", headers=headers)
# print(r.status_code)
# print(r.text)

