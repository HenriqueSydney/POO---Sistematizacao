# Use a imagem base do Node.js
FROM node:14

# Configuração do diretório de trabalho
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# Exponha a porta da aplicação
EXPOSE 5173

# Comando de inicialização da aplicação
CMD ["npm", "run", "dev"]
