import re
import spacy
from fastapi import HTTPException
from utils.file_utils import guess_and_extract

nlp = spacy.load("pt_core_news_sm")

def nlp_preprocess(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    doc = nlp(text)
    tokens = []
    for token in doc:
        if token.is_stop or token.is_punct:
            continue
        tokens.append(token.lemma_.lower())
    
    return " ".join(tokens)

def process_email(req):
    if not (req.text or req.file_base64):
        raise HTTPException(status_code=400, detail="Envie 'text' OU 'file_base64'.")

    if req.file_base64:
        email_text = guess_and_extract(req.file_base64, req.filename)
    else:
        email_text = req.text or ""

    return nlp_preprocess(email_text)
