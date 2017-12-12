
**Deploying to Amazon AWS**


1.Create an account in AWS

2.Launch an Linux free tier instance.

3.Select respective VPC, Subnet and configure security group with necessary ports.

4.Create key pair in your system, while logging into the instance, we need to use the key.

5.Open putty, login with ec2-user@ec2-13-56-16-66.us-west-1.compute.amazonaws.com as host address with saved key.

6.Install docker using below commands.
 
	sudo yum update -y


	sudo yum install -y docker


	sudo service docker start


	sudo usermod -a -G docker ec2-user


7. Verify whther you are able to add permission, if not reboot your instance and try again.

8. Now pull the docker images which you have pushed to docker hub using below commands.

	docker pull desusaiteja/studentassist_client


	docker pull desusaiteja/studentassist_server


9. If you are getting any npm module issue, try to build docker imaga again and install modules individually, then push to docker hub.


10. Now run the docker containers which are client and server and link them. Below are the commands.

	docker run --name studentassist_server -p 3001:3001 desusaiteja/studentassist_server


	docker run --name studentassist_client --link studentassist_server:studentassist_server -p 3000:3000 desusaiteja/studentassist_client


11. Done, now we can access our website any where using below URL.

	http://13.56.16.66:3000

Note: Make sure to change all the ip addresses with your cloud ip's before pushing images to docker hub.