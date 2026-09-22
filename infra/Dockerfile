# ==========================================
# 🏗️ COMPASS APP WEB - NEXT.JS + PNPM DOCKERFILE
# ==========================================

# ==========================================
# 📦 BASE STAGE - Configuração inicial
# ==========================================
FROM node:22.14-alpine AS base

# Instalar dependências do sistema necessárias
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    ca-certificates

# Habilitar Corepack e configurar PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Configurar diretório de trabalho
WORKDIR /app

# Configurar usuário não-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# ==========================================
# 📥 DEPENDENCIES STAGE - Instalação de dependências
# ==========================================
FROM base AS deps

# Copiar arquivos de configuração de dependências
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Configurar cache do PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN pnpm config set store-dir /pnpm/.pnpm-store

# Instalar dependências de produção e desenvolvimento
RUN --mount=type=cache,id=pnpm,target=/pnpm/.pnpm-store \
    pnpm install --frozen-lockfile

# ==========================================
# 🏗️ BUILDER STAGE - Build da aplicação
# ==========================================
FROM base AS builder

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copiar código-fonte
COPY . .

# Configurar variáveis de ambiente para build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build da aplicação Next.js
RUN --mount=type=cache,id=pnpm,target=/pnpm/.pnpm-store \
    pnpm build

# ==========================================
# 🚀 PRODUCTION STAGE - Imagem final otimizada
# ==========================================
FROM base AS runner

# Configurar ambiente de produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Criar diretórios necessários
RUN mkdir .next && chown nextjs:nodejs .next

# Copiar arquivos necessários para produção
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Configurar argumentos e variáveis de ambiente
ARG APP_ENV
ARG AWS_REGION

ENV APP_ENV=$APP_ENV \
    AWS_REGION=$AWS_REGION

# Usar usuário não-root para segurança
USER nextjs

# Expor porta da aplicação
EXPOSE 3000

# Health check para monitoramento
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Comando de inicialização otimizado
CMD ["node", "server.js"]