import base64, io
from fastapi import HTTPException
from pypdf import PdfReader

def extract_text_from_pdf(b64_data: str) -> str:
    try:
        raw = base64.b64decode(b64_data)
        reader = PdfReader(io.BytesIO(raw))
        return "\n".join([p.extract_text() or "" for p in reader.pages]).strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao ler PDF: {e}")

def extract_text_from_txt(b64_data: str) -> str:
    try:
        raw = base64.b64decode(b64_data)
        try:
            return raw.decode("utf-8")
        except UnicodeDecodeError:
            return raw.decode("latin-1")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao ler TXT: {e}")

def guess_and_extract(file_base64: str, filename: str):
    name = (filename or "").lower()
    if name.endswith(".pdf"):
        return extract_text_from_pdf(file_base64)
    if name.endswith(".txt"):
        return extract_text_from_txt(file_base64)

    header = base64.b64decode(file_base64)[:5]
    if header == b"%PDF-":
        return extract_text_from_pdf(file_base64)

    return extract_text_from_txt(file_base64)
