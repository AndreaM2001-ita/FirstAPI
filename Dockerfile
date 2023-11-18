#use node as a base image for the image of my application
FROM node:alpine
#setting environemnt variable within image 
ENV MONGO_DB_USERNAME=marcosanoandrea \
    MONGO_DB_PWD=9124
    #create folder on my docker directory
RUN mkdir -p /home/dockerSito 
#run - used to run linux commands on the docker container
COPY ./src /home/dockerSito 
#copy runs on the host 
WORKDIR /home/dockerSito
RUN npm install

CMD ["node", "server.js"]




