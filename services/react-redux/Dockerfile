FROM node:8

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /react
ADD . /react

EXPOSE 3000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/react/run.sh"]
CMD ["start"]
