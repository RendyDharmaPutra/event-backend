FROM node:18-alpine

WORKDIR /app

# Copy package.json dan lockfile untuk install dependencies
COPY package*.json ./

# Install dependencies (termasuk devDependencies, karena ini dev mode)
RUN npm install

# Expose port untuk Express
EXPOSE 3000

# Command default → jalankan nodemon
CMD ["npm", "run", "dev"]
