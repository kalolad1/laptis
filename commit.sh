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
flake8 . --config .flake8
mypy --config-file mypy.ini -p laptis
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate
python manage.py test core
pip freeze > ./requirements.txt

git add -A
git commit -m "$1"
git push

alert_success