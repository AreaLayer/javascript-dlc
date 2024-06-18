FROM docker/dev-environments-javascript
FROM --platform=arm64 docker/dev-environments-javascript:arm64
RUN git clone https://github.com/AreaLayer/javascript-dlc.git
WORKDIR cd javascript-dlc & npm run start
COPY javascript-dlc dev-environments-javascript/javascript-dlc
RUN npm install
CMD ["npm", "start"]
