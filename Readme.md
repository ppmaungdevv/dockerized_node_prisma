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
  ```

  ```
  FLUSH PRIVILEGES;
  ```

- When using container or service name of mysql docker as a `DATABASE_URL`, do run the `npx prisma` inside node conatiner shell

## Prisma CLI commands

```
npx prisma migrate dev --name init
```

```
npx prisma generate
```

Note:

- before creating a new migration file run `npx prisma db pull`
- to update existing prisma schema file, follow the steps below

  ```
  npx prisma db pull
  ```

  then edit the schema file and the run the commnad below

  ```
  npx prisma migrate dev --create-only --name migration
  ```

  check whether migration file is correct or not if you want to rename the column without losing data do it right now
  after that run the commad below

  ```
  npx prisma migrate dev
  ```

### DB Seeding

- create data file like `category.js`
- create `seed.js` file inside `prisma` folder
- add neccessary code to `seed.js`
- add following to `package.json`

  ```
  "prisma": {
    "seed": "node prisma/seed.js"
  }
  ```

- run
  ```
  npx prisma db seed
  ```

## Helpful extension for VSCode

- Prisma
