venv
----
python -m venv <environment_name>
<environment_name>\Scripts\activate

python
------
pip freeze > requirements.txt
pip install -r requirements.txt


django
------
python -m pip install django
python manage.py runserver