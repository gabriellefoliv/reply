from fastapi import APIRouter, HTTPException
from schemas.classify import ClassifyRequest, ClassifyResponse
from services.email_processor import process_email
from services.gemini import analyze_with_gemini

router = APIRouter()

@router.head("/health")
def health_check():
    return {"status": "ok"}

@router.post("/classify", response_model=ClassifyResponse)
def classify(req: ClassifyRequest):
    email_text = process_email(req)

    if not email_text.strip():
        raise HTTPException(status_code=400, detail="Conteúdo vazio após leitura do email.")

    return analyze_with_gemini(email_text)