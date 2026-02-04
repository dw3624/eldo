# 앱 실행

```bash
cd eldo/
npm i
npm run dev
```

## Prisma

### DB pull 이후

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

### prisma에서 외부/로컬 db 변경법

- schema.prisma에서 output 경로 변경
- lib/prisma.ts 의 PrismaClient 변경
