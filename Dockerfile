FROM node:18-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia dependencias
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install --omit=dev

# Copia el resto del código
COPY . .

# Compila la app
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Inicia la app
CMD ["node", "dist/main"]
