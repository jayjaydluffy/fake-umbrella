# Fake Umbrella Test Project
Fullstack test/demo project built in Django REST Framework and React, only for local setup.

## How to run in local
After cloning the repository, run the Docker container individually.

### `API`
As mentioned, this is built in Django REST Framework.

```
cd api
docker-compose up
```
The API should be accessible at `localhost:8000`.

### `WEB`
The frontend application is done in React, bootstrapped in `create-react-app`.

```
cd web
docker-compose up -d
docker-compose exec web bash

# Inside the shell
yarn install
yarn start
```
The API should be accessible at `localhost`.