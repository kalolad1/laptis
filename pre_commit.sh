#!/bin/bash
set -e
# Script to get push ready by migrating, formatting, outputting static files,
# and running tests.

function alert_failure {
  echo "Bro what kind of code are you writing! BOOOOOOOOO!";
  cat rat_ascii_art.txt;
}

function alert_success {
  echo "Looks good to commit! FULL SEND!";
  cat eagle_ascii_art.txt;
}

trap alert_failure ERR

# Backend
black . --preview
flake8 backend --config backend/.flake8
mypy --config-file backend/mypy.ini -p backend.core
python backend/manage.py collectstatic --noinput
python backend/manage.py makemigrations
python backend/manage.py migrate
python backend/manage.py test core
pip freeze > backend/requirements.txt

# Frontend
cd frontend
npm run lint

git add -A

cd ..
alert_success