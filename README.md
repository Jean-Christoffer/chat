RAG_TEMPLATE

## Getting Started

fill the requried env
<ul>
<li>POSTGRES_USER</li>
<li>POSTGRES_PASSWORD</li>
<li>POSTGRES_DB</li>
<li>OPENAI_API_KEY</li>
<li>DATABASE_URL</li>
</ul>

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
