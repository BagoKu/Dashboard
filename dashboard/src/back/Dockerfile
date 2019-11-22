# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /back

# add `/app/node_modules/.bin` to $PATH
ENV PATH dashboard/src/back/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json dashboard/src/back/package.json
RUN npm install

# start app
CMD ["npm", "start"]
