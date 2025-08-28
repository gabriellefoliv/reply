import re, json
from fastapi import HTTPException
import google.generativeai as genai
from config import MODEL_NAME
from schemas.classify import ClassifyResponse

def build_prompt(email_text: str, language: str) -> str:
    return f"""
        Classifique o email como "Produtivo" (requer ação/resposta, ex.: pedido, dúvida, atualização)
        ou "Improdutivo" (sem ação imediata, ex.: agradecimento, felicitação).

        Gere uma resposta PROFISSIONAL no idioma {language}:
        - Produtivo: objetiva, peça dados faltantes ou indique próximo passo.
        - Improdutivo: cordial e breve.

        Retorne em JSON:
        {{
        "category": "Produtivo|Improdutivo",
        "suggested_reply": "string"
        }}

        Email:
        \"\"\"{email_text}\"\"\"
        """

def analyze_with_gemini(cleaned: str, language: str):
    prompt = build_prompt(cleaned, language)
    model = genai.GenerativeModel(MODEL_NAME)
    result = model.generate_content(prompt)

    text_out = (result.text or "").strip()
    text_out = re.sub(r"^```(?:json)?", "", text_out).strip()
    text_out = re.sub(r"```$", "", text_out).strip()

    try:
        data = json.loads(text_out)
    except Exception:
        raise HTTPException(status_code=502, detail=f"Falha ao interpretar resposta: {text_out}")

    category = data.get("category", "").strip()
    if category.lower().startswith("prod"):
        category = "Produtivo"
    elif category.lower().startswith("improd"):
        category = "Improdutivo"
    else:
        category = "Produtivo"

    return ClassifyResponse(
        category=category,
        suggested_reply=data.get("suggested_reply", "").strip(),
        tokens_estimate=(
            result.usage_metadata.total_token_count
            if hasattr(result, "usage_metadata") and result.usage_metadata
            else 0
        ),
    )
