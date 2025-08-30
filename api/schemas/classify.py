from typing import Optional
from pydantic import BaseModel, Field
from config import MODEL_NAME

class ClassifyRequest(BaseModel):
    text: Optional[str] = Field(default=None, description="Texto do email")
    file_base64: Optional[str] = Field(default=None, description="Arquivo .pdf ou .txt em Base64")
    filename: Optional[str] = Field(default=None, description="Nome do arquivo")

class ClassifyResponse(BaseModel):
    category: str
    suggested_reply: str
    tokens_estimate: Optional[int] = 0
    model: str = MODEL_NAME
