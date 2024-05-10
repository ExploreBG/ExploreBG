FROM node:20.11.1

RUN mkdir /src/
WORKDIR /src/

COPY . /src/
RUN npm install

EXPOSE 3000

CMD npm run start