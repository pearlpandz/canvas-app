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
docker run -d --name my-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo