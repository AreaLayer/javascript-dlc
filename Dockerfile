# Use a Node.js base image for JavaScript development
FROM node:lts-alpine

# Clone the repository
RUN git clone https://github.com/AreaLayer/javascript-dlc.git

# Set the working directory
WORKDIR /javascript-dlc

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
