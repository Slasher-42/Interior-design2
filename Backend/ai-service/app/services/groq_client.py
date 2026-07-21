from groq import Groq

from app.config import settings

_client: Groq | None = None


def get_client() -> Groq:
    global _client
    if _client is None:
        # max_retries retries transient failures (429/5xx incl. 502) with
        # exponential backoff, so a single gateway blip no longer fails the chat.
        _client = Groq(api_key=settings.groq_api_key, timeout=30.0, max_retries=3)
    return _client
