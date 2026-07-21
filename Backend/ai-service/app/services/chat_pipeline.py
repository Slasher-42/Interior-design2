import logging

from app.config import settings
from app.prompts.chat_prompt import CHAT_SYSTEM_PROMPT
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.groq_client import get_client

logger = logging.getLogger(__name__)


class ChatError(Exception):
    pass


def chat(request: ChatRequest) -> ChatResponse:
    client = get_client()

    messages = [{"role": "system", "content": CHAT_SYSTEM_PROMPT}]
    for m in request.history[-10:]:
        role = "assistant" if m.role == "assistant" else "user"
        messages.append({"role": role, "content": m.content})
    messages.append({"role": "user", "content": request.message})

    try:
        response = client.chat.completions.create(
            model=settings.reasoning_model,
            messages=messages,
            temperature=0.4,
            max_tokens=400,
        )
    except Exception as exc:
        # Log the full provider error (may be a large HTML page) server-side only;
        # surface a short, clean message to the user instead of dumping raw HTML.
        logger.exception("Groq chat completion failed")
        raise ChatError(
            "The assistant is temporarily unavailable. Please try again in a moment."
        ) from exc

    reply = response.choices[0].message.content
    if not reply or not reply.strip():
        raise ChatError("ai-service returned an empty chat reply")
    return ChatResponse(reply=reply.strip())
