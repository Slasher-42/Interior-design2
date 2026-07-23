from fastapi import APIRouter

router = APIRouter()


# Accept HEAD as well as GET so uptime pingers (e.g. UptimeRobot's free plan,
# which can only send HEAD) get 200 instead of 405 and keep the service awake.
@router.api_route("/health", methods=["GET", "HEAD"])
def health():
    return {"status": "ok"}
