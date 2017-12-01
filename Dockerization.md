**Dockerizing Client and Server**:

###Dockerizing Locally:

1.Create a Docker file for Server and put it in Server Folder location

FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
EXPOSE 3001

2.Go to the Server location and build an image with any name

	docker build -t nodeserver

3.For Mongo db connection in docker, pull mongo image from docker hub.

	docker pull mongo:latest

4.Run the container for mongodb and give one unique host name, such that we need not to change ip for db when deployed to cloud.

	docker run --name mongodb -h student_mongo mongo

5.Run the container with above built image and also link with mongodb container using below command

	docker run --name nodeserver --link mongodb:mongodb -p 3001:3001 nodeserver