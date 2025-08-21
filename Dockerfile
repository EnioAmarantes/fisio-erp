FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build --configuration=production

FROM node:22
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --frozen-lockfile --omit=dev

EXPOSE 4000
CMD ["node", "dist/fisio-erp/server/server.mjs"]