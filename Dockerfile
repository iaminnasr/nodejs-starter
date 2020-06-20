FROM node:10

# Set the workdir /var/www/myapp
RUN apt update

WORKDIR /usr/src/nodejs_starter
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install
# Copy the package.json to workdir
COPY ./ ./


# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]