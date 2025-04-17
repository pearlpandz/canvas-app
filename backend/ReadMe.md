docker basic commands
---------------------
wsl --distribution docker-desktop
docker info
docker ps
docker pull mongo


MongoDB from docker
-------------------
docker run -d --name my-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo