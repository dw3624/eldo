# Prisma

## DB pull 이후후

```bash
mkdir -p prisma/migrations/init

npx prisma migrate diff \
  --from-empty \
  --to-config-datasource "$DATABASE_URL" \
  --script > prisma/migrations/init/migration.sql

npx prisma migrate resolve --applied init

npx prisma migrate dev
```

## Neon Upload
