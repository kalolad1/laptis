#!/bin/bash
set -e
# Script to get push ready by migrating, formatting, outputting static files,
# and running tests.

function alert_failure {
  echo "What kind of code are you writing! BOOOOOOOOO!";
}

function alert_success {
  echo "Looks good to commit!";
  cat ascii_art/eagle_ascii_art.txt;
}

trap alert_failure ERR

# Backend
black . --preview
echo "Running flake.";
flake8 backend --config backend/.flake8
# For some reason, mypy only works when in the `backend` directory.
cd backend
echo "Running mypy.";
mypy --config-file mypy.ini -p core --exclude core/admin.py
cd ..
python backend/manage.py collectstatic --noinput
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py test core
pip freeze > requirements.txt

# Frontend
cd frontend
npm run lint

git add -A

cd ..
alert_success