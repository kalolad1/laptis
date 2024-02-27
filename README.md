# Laptis

# Install
1. Clone the current repository.
```
git clone https://github.com/kalolad1/laptis.git
```

## Backend
1. Install dependencies for the backend. You should create and activate a virtual environment before installing dependencies.
```
pip install -r backend/requirements.txt
```

2. Run the backend server.
```
python backend/manage.py runserver
```

## Frontend
1. Install dependencies for the frontend. Run the following command from inside the ```/frontend``` directory.
```
npm install
```

2. Run the frontend server using this command from inside the ```/frontend``` directory. You may need to open another terminal.
```
npm run dev
```

## Database
1. Create a local instance of a Postgres database for development purposes. After setting your credentials, set the following environment variables to be used by ```backend/laptis/settings.py```.

```
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
```