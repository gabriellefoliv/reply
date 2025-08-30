from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes import classify

app = FastAPI(
    title="RE:ply - Classificação de email com Gemini API",
    version="1.0.0",
    description="Classifica emails em 'Produtivo' e 'Improdutivo' e sugere resposta automática usando Gemini."
)

origins = [
    "http://localhost:3000",
    "https://reply-autou.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(classify.router)

# Execução local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)