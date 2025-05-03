FROM node:20-alpine

WORKDIR /app

COPY package.json .


ARG NODE_ENV
ARG DATABASE_URL
ARG PORT
ARG JWT_SECRET


ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}

RUN yarn install


COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE ${PORT}

CMD ["yarn", "start"]