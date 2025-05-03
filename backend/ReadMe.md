docker basic commands
---------------------
wsl --distribution docker-desktop
docker info
docker ps
docker pull mongo
docker-compose down
docker-compose up --build

MongoDB from docker
-------------------
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=pass mongo

docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:14

