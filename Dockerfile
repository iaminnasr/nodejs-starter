FROM node:10

# Set the workdir /var/www/myapp
WORKDIR /usr/src/nodejs_starter

# Copy the package.json to workdir
COPY ./ ./

RUN apt update
# Run npm install - install the npm dependencies
RUN npm install

# Expose application ports - (4300 - for API and 4301 - for front end)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]