# videa-video-sharing
A video sharing platform, created for semester 6 of my university. The architecture of this application will be the microservices architecture.

## Architecture
![Architecture Image](https://i.ibb.co/xzxj1Zn/Architecture-V2-drawio.png)
## Microservices
In this project I have a couple microservices that basically act as mini projects connected. This way of creating applications is very effective, although it is very difficult to do correctly, as there is a lot of nuances and complexities that come from such an architecture. I have two services that I have created with dotnet Web API, a Video and a Like service. Both services are made simple, as to avoid any additional complexity. 

## Asynchronous communication
One of the main benefits from having microservices as the backend architecture is that they are very loosely coupled and scalable. This means that the services need to communicate somehow between each other. There was an option to create *synchronous* HTTP requests between the services, but that makes the services less loosely coupled and less scalable, which kind of kills the point of having such an architecture in the first place. That's why I opted for RabbitMQ, which is a Message Broker, and it supports *asynchronous* communication. The aim here was to have a simple (and stupid) event bus, but more complex services.

## API Gateway
The API Gateway serves as a proxy server that redirects the user requests to the specific services. The aim of this is to have a single URL where the requests are sent, and the different services receive them. My choice for the API Gateway was to use nginx, as it also had the proxy server functionality, and it also came with a load balancer. The load balancer distributes the requests between different instances of the same service that is being called, this allows for efficient vertical scaling of the services and even distribution of load (network requests).

## Frontend
The frontend, in my case, also acts as a service and can be scaled depending on the network load being experienced. I built my frontend using React and used nginx as the server. At the start of this project, I started building my frontend first and I chose not to use any style framework, instead I went with pure CSS. Considering the time, it took me to build the microservices architecture, I realized it was a mistake. The frontend is not very responsive as I did not have the time to make it perfect as I had to deal with so many other things related to backend and DevOps.

## CI/CD
During this project I made sure to prepare myself when it came to Github Actions, even then I still experienced hardships while creating the numerous steps required to set up the whole continuous integration and continuous delivery pipeline with Github. I opted to use three actions in total:
1. Run backend tests
2. Run CodeQl
3. Prepare, Build, Test and Push images to DockerHub.

The reason for this is that I wanted to have separations between the different actions as much as possible, but I also wanted to have control over which steps are done first. Because of this I decided to keep the files to a minimum number and instead I focused on having one large file that prepares, builds, tests, and pushes everything correctly, while two more github action yaml files act as support. The first yaml file runs the Integrations tests that I've setup for the backend and makes sure that everything is running correctly. The second file goes over the quality of the code and searches for any vulnerabilities or bad practices. The third and most important yaml file prepares the testing environment, builds all the services correctly, runs the end-to-end tests and, if everything succeeds the services are pushed to DockerHub and uploaded to AWS.

## Testing Environment
During this project I created my own testing enviornment as I needed a way to run everything in development mode, while using an in-memory database. I created a new file called *docker-compose.testing.yml*, where I included the services, I needed for my testing needs. I also created an *nginx.test.conf* file, where I pointed to my testing services. I used the docker-compose.testing.yml file to run the services in development mode, so that they automatically use the in-memory database I programmed to start only when the service is started in development mode. I also created two modes for my React App, development, and production, I use different API URLs for the different modes. All of this put together created a reliable testing environment that gave me a lot more confidence in the reliability of my software solution.

## Database
I used PostgreSQL for my database of choice. Postgre is an open-source *object* relational database. Postgre offers me more features than a traditional MySQL database, and it is compliant with all the use cases I have for this project. I included this database by using an Docker image and hosting it as a service, using docker-compose. 
Since I decided to move to the cloud I changed my database. I decided that I should migrate to the Azure SQL Server database, that is a paid service (but I got it for free for 1 year). The new database is easier to setup in the cloud, as I do not need any setup files and I can just hook it up very easy in production.

## Security
I am working on this right now.

## Microsoft Azure Deployment
I've decided to deploy my application on microsoft azure. I chose this over AWS as I have a student account with 100$ to spare from my university and setting up the environment there would not be that difficult from what I researched. The main problem that I forsee is that my database and nginx conf file would need to be allocated on the cloud as well. I am considering switching to a online cloud database an not bothering with an image.
This project is currently running in a VM that is hosted in the cloud. Im considering getting a proper domain and setting up SSL for it, so that I can improve upon security.

## How to run
Running this project is very easy if you have Docker

This method should work currently (5/30/2022)
1. Pull this repository
2. Run my docker-compose file
3. Type localhost as browser URL and everything should be automatically set

If the method above does not work, since I am reliant on the cloud for my database. Run my docker-compose.testing file with the
**docker-compose -f docker-compose-testing.yml** command in the CLI. This will run everything in testing and development mode. The databases will be In-Memory, but they will work and will give a good idea of what the project is supposed to work like.
