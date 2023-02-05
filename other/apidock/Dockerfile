FROM tensorflow/tensorflow

# Maintainer info
LABEL maintainer="salt.gabriel@gmail.com"

# Make working directories
RUN  mkdir -p  /digit-api
WORKDIR  /digit-api

# Upgrade pip with no cache
RUN pip install --no-cache-dir -U pip

# Copy application requirements file to the created working directory
COPY requirements.txt .

# Install application dependencies from the requirements file
RUN pip install -r requirements.txt
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

# Copy every file in the source folder to the created working directory
COPY  . .

# Run the python application
CMD ["python3","app.py"]