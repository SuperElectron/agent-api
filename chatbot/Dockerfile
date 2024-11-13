FROM python:3.12

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/
WORKDIR /chatbot

# Copy the requirements.txt file into the container at /app
COPY requirements.txt .
RUN apt-get update -yqq && apt-get install -y graphviz graphviz-dev
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt
# default run command for container
CMD ["python3", "main.py"]
