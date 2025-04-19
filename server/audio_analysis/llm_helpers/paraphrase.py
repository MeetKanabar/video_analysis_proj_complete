import os
import openai
import socket
import requests
import httpx
from openai import OpenAI
from openai._types import NotGiven

# ✅ Store the original getaddrinfo method to fallback if needed
if not hasattr(socket, "__orig_getaddrinfo"):
    socket.__orig_getaddrinfo = socket.getaddrinfo

# ✅ Force IPv4 to prevent common DNS errors (421 etc.)
socket.getaddrinfo = lambda *args, **kwargs: [
    a for a in socket.__orig_getaddrinfo(*args, **kwargs) if a[0] == socket.AF_INET
]

# ✅ Load API key (env preferred for security)
API_KEY = os.getenv("OPENAI_API_KEY", "sk-proj-...replace_with_yours...")
if not API_KEY:
    raise ValueError("❌ No OpenAI API key found. Set OPENAI_API_KEY as an environment variable.")

client = OpenAI(
    api_key=API_KEY,
    http_client=httpx.Client(http2=False, timeout=10.0)  # disables HTTP/2 which breaks some TLS
)

def paraphrase_text(text, model="gpt-3.5-turbo", temperature=0.7):
    """
    Paraphrases input text using OpenAI's GPT model.

    Args:
        text (str): Text to paraphrase
        model (str): Model to use
        temperature (float): Creativity level

    Returns:
        str: Paraphrased output
    """
    try:
        print("🔹 Original Text:", text)
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are an assistant that rewrites text using different wording while keeping the meaning. Be fluent, natural, and avoid redundancy."},
                {"role": "user", "content": f"Paraphrase this: {text}"}
            ],
            temperature=temperature,
            max_tokens=200,
        )

        paraphrased = response.choices[0].message.content.strip()
        print("✅ Paraphrased:", paraphrased)
        return paraphrased

    except openai.APIConnectionError as e:
        print("❌ Network error:", e.__class__.__name__, "-", str(e))
    except openai.OpenAIError as e:
        print("❌ OpenAI API error:", e.__class__.__name__, "-", str(e))
    except Exception as e:
        print("❌ Unexpected error:", type(e).__name__, "-", str(e))

    return None

# ✅ Optional: Test internet access to OpenAI
def test_connectivity():
    try:
        response = requests.get("https://api.openai.com/v1/models", headers={"Authorization": f"Bearer {API_KEY}"})
        print(f"🌐 Connectivity check: {response.status_code} ({'OK' if response.ok else 'Fail'})")
    except Exception as e:
        print("❌ Failed to reach OpenAI API:", str(e))

if __name__ == "__main__":
    test_connectivity()
    print("🔍 Running Paraphraser...\n")
    sample_text = "The weather is great for a walk in the park today."
    paraphrase_text(sample_text)
