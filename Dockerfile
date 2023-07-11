# base image
FROM node:latest

# create & set working directory
WORKDIR /app

ENV ENV_FILE ./.env
RUN env $(cat $ENV_FILE | xargs)

# copy source files
COPY . .

# install dependencies
RUN npm install

# Build the TypeScript code to JavaScript and compile
RUN npm run build
#Expose application port
EXPOSE 3000
# start app
CMD npm run start