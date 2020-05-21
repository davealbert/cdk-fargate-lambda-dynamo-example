FROM node:12 as build
WORKDIR /src
ADD index.js /src
ADD package.json /src
RUN npm i

FROM node:12-slim as release
COPY --from=build /src /app
WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "start"]
