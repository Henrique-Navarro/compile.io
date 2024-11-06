FROM node:20.11.0

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o restante do projeto
COPY . .

# Expor a porta do React dev server
EXPOSE 3000

# Comando padrão para rodar o React em modo desenvolvimento
CMD ["npm", "start"]
