# Use a base image for JavaScript development
FROM docker/dev-environments-javascript:arm64

# Clone the repository
RUN git clone https://github.com/AreaLayer/javascript-dlc.git

# Set the working directory
WORKDIR /javascript-dlc

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
