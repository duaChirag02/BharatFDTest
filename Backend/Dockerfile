# Step 1: Use Node.js as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend code
COPY . .

# Step 6: Expose port 5000 for Express API
EXPOSE 5000

# Step 7: Start the Express server
CMD ["node", "server.js"]
