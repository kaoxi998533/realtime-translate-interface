FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public ./public

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
