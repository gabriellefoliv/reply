from fastapi import FastAPI
from mangum import Mangum
from routes import classify

app = FastAPI(
    title="RE:ply - Classificação de email com Gemini API",
    version="1.0.0",
    description="Classifica emails em 'Produtivo' e 'Improdutivo' e sugere resposta automática usando Gemini."
)

app.include_router(classify.router)

# Handler para AWS Lambda
handler = Mangum(app)

# Execução local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)