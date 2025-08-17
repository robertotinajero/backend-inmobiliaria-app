# Use the latest LTS version of Node.js
FROM node:18-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "src/index.js"]
