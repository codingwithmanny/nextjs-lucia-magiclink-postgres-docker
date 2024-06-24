# NextJS Lucia Passwordless / Magiclink Postres Docker

The following is an example implementing Lucia magilink authentication with postgres.

## Requirements

- Node `v20` or greater
- Pnpm
- Docker

## Quick Setup

### 1 - Install Dependencies

```bash
# FROM: ./

pnpm install;
```

### 2 - Set Environment Variables

```bash
# FROM: ./

cp .env.example .env;
```

### 3 - Start Database

```bash
# FROM: ./

pnpm db:up;
```

### 4 - Generate Local Database

```bash
# FROM: ./

pnpm db:gen;
```

### 5 - Push Database Changes

```bash
# FROM: ./

pnpm db:push;
```

### 6 - Run App

```bash
# FROM: ./

pnpm dev;

# [Expected Output]:
#   ▲ Next.js 14.2.3
#   - Local:        http://localhost:3000
#   - Environments: .env.local
# 
#  ✓ Starting...
#  ✓ Ready in 1785ms
```

### 7 - Run Drizzle Studio

```bash
# FROM: ./

pnpm db:studio;

# [Expected Output]:
# ...
# Drizzle Studio is up and running on https://local.drizzle.studio
```

### 8 - See Mailhog Email Server

```bash
# FROM: ./

open http://localhost:8025
```

### 9 - Destroy Database

```bash
# FROM: ./

pnpm db:down;
```