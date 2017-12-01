**Dockerizing Client and Server**:

**Dockerizing Locally:**

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

6.Create a Docker file for Client and put it in Client Folder location

	FROM node:latest
	WORKDIR /app
	COPY package.json /app
	RUN npm install
	COPY . /app
	CMD npm start
	EXPOSE 3000

7.Go to the Server location and build an image with any name

	docker build -t reactapp


8.Run the container with above built image and also link with nodeserver container using below command

	docker run --name reactapp --link nodeserver:nodeserver -p 3000:3000 reactapp

**Pushing images to Dockerhub:**

9.Create an account for Docker Hub.

10.Login with docker hub credentials in Docker terminal

	Docker Login

11.Now create Sever image with your docker username

	docker build -t username/nodeserver

12.Push to image docker hub

	docker push username/nodeserver

13.Now create Client image with your docker username

	docker build -t username/reactapp

12.Push to image docker hub

	docker push username/reactapp

13.Done! Now we can pull our images from any computer with below pull commands

	docker pull username/nodeserver

	docker pull username/reactapp