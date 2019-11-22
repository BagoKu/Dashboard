# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /front

# add `/app/node_modules/.bin` to $PATH
ENV PATH dashboard/src/front/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json dashboard/src/front/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

# start app
CMD ["npm", "start"]
