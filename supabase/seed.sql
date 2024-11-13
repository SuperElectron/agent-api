-- Enable the pgvector extension for vector operations
CREATE EXTENSION IF NOT EXISTS vector;

-- Create the main table for storing vectors and associated content
CREATE TABLE IF NOT EXISTS faq_vectors (
    id SERIAL PRIMARY KEY,          -- Unique identifier for each document
    content TEXT NOT NULL,          -- Document content
    embedding VECTOR(1536) NOT NULL -- Vector representation (1536 dimensions for OpenAI embeddings)
);

-- Index for fast vector similarity search
CREATE INDEX IF NOT EXISTS idx_faq_vectors_embedding ON faq_vectors USING ivfflat (embedding);

-- add user information for the development environment
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id UUID PRIMARY KEY,
    schedule JSONB
);

INSERT INTO users (id, schedule)
VALUES (
        'a51a8976-e1ae-4222-8dfa-aebd116df8e5',
        '[]'::jsonb
);
