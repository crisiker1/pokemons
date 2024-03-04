# Usa una imagen base de Node
FROM node:14 as builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación Angular en modo de producción
RUN npm run build -- --prod

# Utiliza una imagen más ligera para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos de la aplicación Angular al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
