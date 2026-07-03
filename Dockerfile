# ---------- Stage 1: build ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies with a clean, reproducible install
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Build the static site
COPY . .
RUN npm run build

# ---------- Stage 2: serve ----------
FROM nginx:1.27-alpine AS runtime

# Drop the default config and add a hardened one
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Static build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Basic container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
