# Dockerized Node app with Prisma ORM

#### Prisma and Docker Learning Project

## How to run

```
docker compose up -d
```

## Few side notes when running with docker

- Local use only

  - Give neccesary access for the PRISMA_USER, used in mysql container
  - Replace `prisma_user` with database username for the mysql container

  ```
  GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'prisma_user'@'%';

  FLUSH PRIVILEGES;
  ```

- When using container or service name of mysql docker as a `DATABASE_URL`, do run the `npx prisma migrate dev` inside node conatiner shell

## Prisma CLI commands

```
npx prisma migrate dev --name init

npx prisma generate
```

## Helpful extension for VSCode

- Prisma
