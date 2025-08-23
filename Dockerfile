# Define a imagem base como sendo a versão alpine do Node.js 22, que é leve e contém o ambiente Node.js necessário
# O 'AS builder' nomeia esta etapa para possível uso em multi-stage builds
FROM node:22-alpine AS builder

# Define o diretório de trabalho dentro do container onde os arquivos da aplicação serão copiados e executados
WORKDIR /app

# Copia todos os arquivos e diretórios do diretório local para o diretório de trabalho (/app) no container
COPY . ./

# Executa o comando npm ci com a flag --only=production, instalando apenas as dependências listadas em "dependencies" no package.json
# Isso evita a instalação de dependências de desenvolvimento, otimizando o tamanho da imagem
RUN npm ci --only=production

# Informa que a aplicação dentro do container escutará na porta 3333
# Isso é apenas uma documentação e não publica a porta automaticamente; é necessário mapear a porta ao rodar o container
EXPOSE 3333

# Define o comando padrão a ser executado quando o container for iniciado
# Executa o arquivo src/server.ts usando o Node.js
CMD [ "node", "src/server.ts" ]