#!/bin/bash
set -e

echo "Showing migrations..."
python manage.py showmigrations

echo "Making migrations for all apps..."
python manage.py makemigrations --noinput

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Checking for superuser..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'muthupandi.velmurugan@outlook.com', 'cre@v0@dm!n')
END

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Showing migrations for api..."
python manage.py showmigrations api

echo "Making migrations for api..."
python manage.py makemigrations api

echo "Applying api migrations..."
python manage.py migrate api

echo "Starting Gunicorn..."
exec gunicorn myapp.wsgi:application --bind 0.0.0.0:8000
