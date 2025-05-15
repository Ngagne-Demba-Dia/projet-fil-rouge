# Étape 1 : Build de l'application
FROM node:18-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les deps
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Construire l'application (génère le dossier dist/)
RUN npm run build

# Étape 2 : Serveur web (nginx)
FROM nginx:alpine

# Copier le build vers le dossier de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier un fichier de conf nginx personnalisé (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
