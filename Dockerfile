FROM node:20.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV VITE_SERVICE_ID=service_nbmyx6d
ENV VITE_TEMPLATE_ID=template_10zndbn
ENV VITE_PUBLIC_KEY=wESNT5IROq61fZ-In

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]