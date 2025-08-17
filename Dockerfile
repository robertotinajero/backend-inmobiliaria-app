# Use the latest LTS version of Node.js
FROM node:18-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia dependencias
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install

# Copia el resto del código
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Inicia la app
#CMD ["node", "dist/main"]
CMD ["npm", "start"]
