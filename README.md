RAG_TEMPLATE

## Getting Started

fill the requried env

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
OPENAI_API_KEY=
DATABASE_URL=

```bash
docker compose up -d

docker exec -it postgres-pgvector psql -U <USER_NAME> -d <DB_NAME>

CREATE EXTENSION IF NOT EXISTS vector;

npm i

npx drizzle-kit push

npm run dev

```

Generate embeddings from a URL

```bash
npm run scrape "URL"
```

Generate embeddings from a pdf

```bash
npm run text
```
