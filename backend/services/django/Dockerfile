# Use an official Python image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files (optional)
RUN python manage.py collectstatic --noinput

# Expose the Django port
EXPOSE 8000

# Run Django app using gunicorn
CMD ["gunicorn", "yourprojectname.wsgi:application", "--bind", "0.0.0.0:8000"]
