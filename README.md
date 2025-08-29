# RE:ply - Classificação de Emails com Gemini API

**RE:ply** é uma aplicação web que permite enviar emails ou textos de emails para classificação automática. O sistema identifica se o conteúdo do email é Produtivo ou Improdutivo e sugere uma resposta automática.

## Requisitos do Sistema

Requisitos técnicos mínimos para rodar o projeto:

### Backend

- Python 3.11+
- FastAPI
- Gemini API (google.generativeai)
- PyPDF / leitura de arquivos .pdf e .txt
- Uvicorn (rodar api localmente)

### Frontend

- Node.js 20+
- Next.js 14+
- Axios para requisições à API
- Componentes UI para estilização (shadcn UI + acertenity UI)

## Requisitos do Projeto

Critérios que foram implementados no projeto:

### Backend

- Leitura e Processamento:
  - Script em Python que lê o conteúdo dos emails;
  - Técnicas de NLP (remoção de stop words, stemming/lemmatização, etc)
- Classificação e Resposta:
  - Algoritmo de classificação que categoriza o conteúdo em Produtivo ou Improdutivo
  - Gemini API
- Classificação:
  - Determina a categoria do email
- Geração de Resposta:
  - Sugere uma resposta automática adequada
- Integração com interface:
  - CORS permitindo a entrada das requisições

### Frontend

- Formulário de Upload:
  - Permite o upload de arquivos em formato .txt ou .pdf ou a inserção direta de texto
  - Botão para enviar o email para processamento
- Exibição dos Resultados:
  - Mostra a categoria atribuída ao email (Produtivo ou Improdutivo)
  - Exibe a resposta automática (usuário consegue copiar)

## Rodando a API localmente

1. Clone o repositório:

```bash
git clone https://github.com/gabriellefoliv/reply.git
cd reply/api
```

2. Crie e ative um ambiente virtual

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

3. Instale as dependências

```bash
pip install -r requirements.txt
```

4. Configure a variável de ambiente para a Gemini API

```bash
export GEMINI_API_KEY="sua_chave_aqui"  # Linux/Mac
set GEMINI_API_KEY="sua_chave_aqui"  # Windows
```

5. Rode o servidor local:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

A API estará disponível em `http://localhost:8000`.

## Endpoint da API

- `POST /classify`: Recebe um texto ou arquivo de email e retorna a classificação e uma resposta sugerida.

Corpo da requisição:

```json
{
  "text": "Texto do email"
}
```

Corpo da resposta:

```json
{
  "category": "Improdutivo",
  "suggested_reply": "Resposta sugerida pela IA",
  "tokens_estimate": 176,
  "model": "gemini-1.5-flash"
}
```

OBS: Uma rota adicional de /health foi adicionada na intenção de não deixar a API inativa, um monitor do Uptime Robot pinga o servidor de tempo em tempo.

## Rodando o Frontend localmente

1. Navegue até o diretório do frontend:

```bash
cd ../frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a variável de ambiente para o endpoint da API

```bash
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

4. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.
