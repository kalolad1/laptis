#!/bin/bash
set -e
# Script to get push ready by migrating, formatting, outputting static files,
# and running tests.

function alert_failure {
  echo "Commit has failed! BOOOOOOOOO!";
  cat rat_ascii_art.txt;
}

function alert_success {
  echo "Commit has succeeded!";
  cat eagle_ascii_art.txt;
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    exit 1
fi

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
npm run lint -- --fix

git add -A
git commit -m "$1"
git push

alert_success