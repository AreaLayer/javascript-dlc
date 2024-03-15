# Javascript's official image:
FROM javascript::0.1.0

# Set the working directory inside the container
WORKDIR /app

# Copy the DLC logic files into the container
COPY dlc.js

# Build the DLC logic (replace `cargo build` with your actual build command)
RUN npm run --release

# Expose any necessary ports (if applicable)
# EXPOSE 8080

# Define the command to run your DLC logic
CMD ["./target/release/dlc.js"]
