FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_LIFF_ID=2009128968-CvqxUVB8
ENV VITE_API_BASE=https://manyuan-hr-webapp-7bg5jcyg6q-de.a.run.app
ENV VITE_SENTRY_DSN=
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN printf 'server {\n  listen 8080;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
