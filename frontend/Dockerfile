# Use the official Node.js 20 image as the base image
# FROM node:alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the container
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application's source code to the container
# COPY . .

# # Build the React.js application
# RUN npm run build

# # Expose the port that the application listens on
# EXPOSE 3001

# # Start a simple web server to serve the built React.js files
# # CMD [ "npx", "serve", "-s", "build" ]
# CMD [ "npm", "run", "dev" ]

FROM node:alpine

# WORKDIR /srv/app
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
