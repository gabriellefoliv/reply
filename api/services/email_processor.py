import re
from fastapi import HTTPException
from utils.file_utils import guess_and_extract

def light_preprocess(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    lines = []
    for ln in text.splitlines():
        if any(k in ln.lower() for k in ["confidencial", "este e-mail", "atenção: mensagem automática"]):
            continue
        lines.append(ln)

    return "\n".join(lines).strip()

def process_email(req):
    if not (req.text or req.file_base64):
        raise HTTPException(status_code=400, detail="Envie 'text' OU 'file_base64'.")

    if req.file_base64:
        email_text = guess_and_extract(req.file_base64, req.filename)
    else:
        email_text = req.text or ""

    return light_preprocess(email_text)
