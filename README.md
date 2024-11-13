# Digital `Agent Assistant` 🤖 with LangGraph

This repository contains a modular and compact implementation of an end-to-end multi-agent architecture for a travel assistant chatbot, inspired by the [LangGraph's Travel Assistant project](https://langchain-ai.github.io/langgraph/tutorials/customer-support/customer-support/).

      A multi-agent architecture featuring separate specialized agents for different tasks and an orchestrator to manage the workflow.

# Pre-Requisites

- start database 
- [reference](https://supabase.com/docs/guides/local-development)

```bash
$ supabase init
```

- start database
```bash
$ supabase start

Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local

# take note that the following variables are needed below
supabase_url: str = "http://127.0.0.1:54321",
supabase_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
```

- set your environment variables

```dotenv
cd chatbot
cp .env.example .env

# add to the file
OPEN_AI_KEY="add-your-key"
TAVILY_API_KEY="add-your-key"
# replace these with you have from above
SUPABSE_URL="http://127.0.0.1:54321"
SUPABASE_ANON_KEY="add-your-key"
```

- download data
```bash
# install sqlite3
sudo apt-get install -y sqlite3

cd supabase
wget https://storage.googleapis.com/benchmarks-artifacts/travel-db/travel2.sqlite -O data.sqlite
sqlite3 data.sqlite .dump > data.sql

# create seed.sql to start your database
cat vector.sql data.sql > seed.sql
cat vector.sql > seed.sql
```

# Start

```bash
docker compose up
```

---

# TODO

__app__

- integrate schedule with SearchService.py
- for each event, add a specific page to describe it, and a class member to pull details from this page. you will need a new database table to better describe it.
- category and activity keep getting mixed up ... (database search issue)

__internet search__

- it may be possible to use this to gather information about events in the city using TAVILY_API.  
```text
can you tell me about yoga class that i can attend as a hobby?
[{"id": "6708dcba-c3e9-4df2-aa61-400a421531a1", "group_name": "Yoga in the Park", "activity": "yoga", "location": "Turia River Park", "geo_location": "39.46248318166983, -0.35950077515225", "frequency": "Weekly", "start_date": "2024-11-16T21:30:00+00:00", "price": "0", "details": "Open level, €10 per session.", "category": "hobby-interest"}]

can you tell me details about this?
---> pulled web search with meet.com for the actual event! (had lots of details too)
```
