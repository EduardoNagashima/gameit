FROM node
WORKDIR /app-node
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT npm run dev