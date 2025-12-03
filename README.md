# 🎯 Elite Tracker API

> API REST completa para rastreamento de hábitos e tempo de foco, com autenticação OAuth via GitHub e isolamento de dados por usuário.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.0-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 📋 Sobre o Projeto

Elite Tracker API é um backend robusto e seguro para gerenciamento de hábitos e controle de tempo de foco, permitindo que usuários acompanhem seu progresso pessoal de forma organizada e eficiente.

### 🔐 Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant GitHub

    User->>Frontend: Clica "Login com GitHub"
    Frontend->>API: GET /auth
    API->>GitHub: Redirect OAuth
    GitHub->>User: Tela de autorização
    User->>GitHub: Autoriza aplicação
    GitHub->>API: GET /auth/callback?code=...
    API->>GitHub: POST exchange code
    GitHub->>API: access_token
    API->>GitHub: GET user data
    GitHub->>API: User info
    API->>API: Gera JWT
    API->>Frontend: { token, nodeId, name, avatarUrl }
    Frontend->>Frontend: Armazena token
    Frontend->>API: Requisições com Authorization: Bearer <token>
```

### Configuração OAuth GitHub

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie uma **OAuth App**
3. Configure:
   - **Application name**: Elite Tracker
   - **Homepage URL**: `http://localhost:4000` (dev)
   - **Authorization callback URL**: `http://localhost:4000/auth/callback`
4. Copie **Client ID** e **Client Secret** para `.env`

### Uso do Token

Após receber o token, inclua em todas as requisições protegidas:

```bash
# Exemplo com curl
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:4000/habits

# Exemplo com HTTPie
http GET localhost:4000/habits "Authorization:Bearer <token>"
```

## 💾 Schemas do Banco de Dados

### Habit

```typescript
{
  _id: ObjectId,
  name: string,           // min: 2, max: 70 caracteres
  isCompleted: Date[],    // Array de datas de conclusão
  userId: string,         // GitHub nodeId (isolamento de dados)
  createdAt: Date,        // Auto-gerado
  updatedAt: Date         // Auto-gerado
}
```

**Índices**:
- `userId` - Para queries rápidas por usuário
- `name + userId` - Previne duplicatas por usuário

### FocusTime

```typescript
{
  _id: ObjectId,
  timeFrom: Date,         // Início do período de foco
  timeTo: Date,          // Fim do período (deve ser > timeFrom)
  userId: string,         // GitHub nodeId (isolamento de dados)
  createdAt: Date,        // Auto-gerado
  updatedAt: Date         // Auto-gerado
}
```

**Índices**:
- `userId` - Para queries rápidas por usuário
- `timeFrom + userId` - Para ordenação e filtragem por data

## ✨ Principais Recursos

- 🔐 **Autenticação OAuth 2.0** com GitHub
- 🔑 **JWT** para gerenciamento de sessões
- 👥 **Multi-tenant** com isolamento de dados por usuário
- ✅ **CRUD Completo** de hábitos
- ⏱️ **Rastreamento de tempo de foco**
- 📊 **Métricas mensais** de progresso
- 🛡️ **Validação robusta** com Zod
- 🚀 **TypeScript** com tipagem estrita

## 🚀 Tecnologias

### Core
- **Node.js 20+** - Runtime JavaScript
- **Express 5.1** - Framework web minimalista
- **TypeScript 5.9** - Superset JavaScript tipado

### Database & ODM
- **MongoDB** - Banco de dados NoSQL
- **Mongoose 9.0** - ODM para MongoDB

### Autenticação & Segurança
- **jsonwebtoken** - Geração e validação de JWT
- **OAuth 2.0** - Autenticação via GitHub
- **Axios** - Cliente HTTP para APIs externas

### Validação & Utilidades
- **Zod 4.1** - Validação de schemas
- **Dayjs 1.11** - Manipulação de datas

### Qualidade de Código
- **Biome 2.3** - Linter e formatter ultrarrápido
- **tsx** - Execução TypeScript com hot reload

## 📦 Instalação

### Pré-requisitos

- Node.js 20+ 
- MongoDB 6+
- Git

### Passo a Passo

```bash
# Clone o repositório
git clone https://github.com/devkassio/Elite-Tracker.git
cd Elite-Tracker

# Instale as dependências
npm install

# Configure as variáveis de ambiente (veja seção abaixo)
cp .env.example .env
# Edite o .env com suas configurações

# Inicie o MongoDB localmente
# mongod (ou use Docker: docker run -d -p 27017:27017 mongo)

# Execute em modo desenvolvimento
npm run dev
```

## 🔧 Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Verificar tipos TypeScript
npm run typecheck

# Formatar código
npm run format

# Lint + format + fix
npm run check
```

## 🏗️ Build & Deploy

```bash
# Compilar TypeScript para JavaScript
npm run build

# Executar em produção
npm run start
```

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento com hot reload |
| `npm run build` | Compila TypeScript para JavaScript (output: `dist/`) |
| `npm run start` | Inicia servidor em produção |
| `npm run check` | Lint + format + fix automático (recomendado) |
| `npm run lint` | Executa apenas linting |
| `npm run format` | Executa apenas formatação |
| `npm run typecheck` | Verifica tipos sem compilar |

## 🔌 API Endpoints

### Autenticação

#### `GET /auth`
Inicia fluxo OAuth com GitHub.

**Response**: Redirect para GitHub

---

#### `GET /auth/callback`
Callback OAuth que gera JWT.

**Query Params**:
- `code`: Código OAuth do GitHub

**Response** `200`:
```json
{
  "nodeId": "U_kgDODFDxpQ",
  "avatarUrl": "https://avatars.githubusercontent.com/u/...",
  "name": "Kássio Barros",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Hábitos (Requer Autenticação)

Todas as rotas abaixo requerem header:
```
Authorization: Bearer <seu_token_jwt>
```

#### `GET /habits`
Lista todos os hábitos do usuário.

**Response** `200`:
```json
[
  {
    "_id": "692f983d052203c6d90bd89c",
    "name": "Correr",
    "isCompleted": ["2025-12-02T03:00:00.000Z"],
    "userId": "U_kgDODFDxpQ",
    "createdAt": "2025-12-03T01:54:05.532Z",
    "updatedAt": "2025-12-03T01:58:27.794Z"
  }
]
```

---

#### `POST /habits`
Cria um novo hábito.

**Body**:
```json
{
  "name": "Meditar"
}
```

**Response** `201`:
```json
{
  "_id": "...",
  "name": "Meditar",
  "isCompleted": [],
  "userId": "U_kgDODFDxpQ",
  "createdAt": "2025-12-03T02:00:00.000Z",
  "updatedAt": "2025-12-03T02:00:00.000Z"
}
```

**Validações**:
- `name`: string, mín 2 caracteres, máx 70 caracteres
- Não permite hábitos duplicados para o mesmo usuário

---

#### `DELETE /habits/:id`
Deleta um hábito.

**Params**:
- `id`: ID do hábito

**Response** `204`: No content

---

#### `PATCH /habits/:id/toggle`
Marca/desmarca hábito como completado no dia atual.

**Params**:
- `id`: ID do hábito

**Response** `200`:
```json
{
  "_id": "...",
  "name": "Correr",
  "isCompleted": ["2025-12-02T03:00:00.000Z", "2025-12-03T03:00:00.000Z"],
  "userId": "U_kgDODFDxpQ",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

#### `GET /habits/:id/metrics`
Retorna métricas mensais de um hábito.

**Params**:
- `id`: ID do hábito

**Query**:
- `date`: Data no formato ISO (ex: `2025-12-01`)

**Response** `200`:
```json
{
  "_id": "...",
  "name": "Correr",
  "isCompleted": [
    "2025-12-02T03:00:00.000Z",
    "2025-12-05T03:00:00.000Z",
    "2025-12-10T03:00:00.000Z"
  ]
}
```

---

### Tempo de Foco (Requer Autenticação)

#### `POST /focus-times`
Registra um período de foco.

**Body**:
```json
{
  "timeFrom": "2025-12-03T10:00:00.000Z",
  "timeTo": "2025-12-03T11:30:00.000Z"
}
```

**Response** `201`:
```json
{
  "_id": "...",
  "timeFrom": "2025-12-03T10:00:00.000Z",
  "timeTo": "2025-12-03T11:30:00.000Z",
  "userId": "U_kgDODFDxpQ",
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Validações**:
- `timeTo` não pode ser anterior a `timeFrom`

---

#### `GET /focus-times`
Lista tempos de foco de um dia específico.

**Query**:
- `date`: Data no formato ISO (ex: `2025-12-03`)

**Response** `200`:
```json
[
  {
    "_id": "...",
    "timeFrom": "2025-12-03T10:00:00.000Z",
    "timeTo": "2025-12-03T11:30:00.000Z",
    "userId": "U_kgDODFDxpQ",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

#### `GET /focus-times/metrics`
Retorna métricas mensais de tempo de foco.

**Query**:
- `date`: Data no formato ISO (ex: `2025-12-01`)

**Response** `200`:
```json
[
  {
    "_id": [2025, 12, 1],
    "count": 3
  },
  {
    "_id": [2025, 12, 2],
    "count": 5
  }
]
```

---

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| `200` | OK - Requisição bem-sucedida |
| `201` | Created - Recurso criado com sucesso |
| `204` | No Content - Recurso deletado com sucesso |
| `400` | Bad Request - Dados inválidos |
| `401` | Unauthorized - Token inválido ou ausente |
| `404` | Not Found - Recurso não encontrado |
| `422` | Unprocessable Entity - Erro de validação |
| `500` | Internal Server Error - Erro no servidor |

---

## 🧪 Exemplos Práticos

### Fluxo Completo de Autenticação

```bash
# 1. Redirecionar para GitHub (no navegador)
open http://localhost:4000/auth

# 2. Após autorização, você será redirecionado para /auth/callback
# O frontend receberá o token JWT

# 3. Use o token nas próximas requisições
export TOKEN="seu_token_aqui"
```

### Gerenciamento de Hábitos

```bash
# Criar hábito
http POST localhost:4000/habits \
  name="Exercícios Físicos" \
  "Authorization:Bearer $TOKEN"

# Listar hábitos
http GET localhost:4000/habits \
  "Authorization:Bearer $TOKEN"

# Marcar como concluído hoje
http PATCH localhost:4000/habits/692f983d052203c6d90bd89c/toggle \
  "Authorization:Bearer $TOKEN"

# Deletar hábito
http DELETE localhost:4000/habits/692f983d052203c6d90bd89c \
  "Authorization:Bearer $TOKEN"

# Métricas de dezembro/2025
http GET "localhost:4000/habits/692f983d052203c6d90bd89c/metrics?date=2025-12-01" \
  "Authorization:Bearer $TOKEN"
```

### Registro de Tempo de Foco

```bash
# Registrar sessão de foco
http POST localhost:4000/focus-times \
  timeFrom="2025-12-03T10:00:00.000Z" \
  timeTo="2025-12-03T11:30:00.000Z" \
  "Authorization:Bearer $TOKEN"

# Listar sessões do dia
http GET "localhost:4000/focus-times?date=2025-12-03" \
  "Authorization:Bearer $TOKEN"

# Métricas mensais
http GET "localhost:4000/focus-times/metrics?date=2025-12-01" \
  "Authorization:Bearer $TOKEN"
```

---

## 🚀 Deploy em Produção

### Pré-requisitos
- Node.js 20+
- MongoDB (recomendado: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- GitHub OAuth App configurado para produção

### Passos

1. **Clone e instale dependências**:
```bash
git clone https://github.com/devkassio/Elite-Tracker.git
cd elitetracker-api
npm install
```

2. **Configure variáveis de ambiente**:
```bash
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/elitetracker
GITHUB_CLIENT_ID=seu_client_id_producao
GITHUB_CLIENT_SECRET=seu_client_secret_producao
JWT_SECRET=chave_secreta_256_bits_minimo
JWT_EXPIRATION=7d
```

3. **Build**:
```bash
npm run build
```

4. **Inicie com PM2 (recomendado)**:
```bash
npm install -g pm2
pm2 start dist/server.js --name elite-tracker-api
pm2 save
pm2 startup
```

5. **Ou com Docker**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 4000
CMD ["node", "dist/server.js"]
```

```bash
docker build -t elite-tracker-api .
docker run -d -p 4000:4000 --env-file .env elite-tracker-api
```

### Configuração de Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name api.elitetracker.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🧪 Testes

```bash
# Healthcheck
http GET localhost:4000/

# Deve retornar:
# {
#   "name": "Elite Tracker",
#   "status": "running",
#   "database": "connected"
# }
```

---

## 🐛 Troubleshooting

### Token expirado
```json
{
  "message": "Token expirado"
}
```
**Solução**: Refaça o login em `/auth`

### MONGODB_URI inválida
```
Error: Invalid MongoDB URI
```
**Solução**: Verifique formato da connection string no `.env`

### Client ID undefined no OAuth
**Solução**: Garanta que `dotenv.config()` está antes de todos os imports em `server.ts`

---

## 📄 Licença

MIT © [Kássio Barros](https://github.com/devkassio)

---

## 👨‍💻 Autor

**Kássio Barros**
- GitHub: [@devkassio](https://github.com/devkassio)
- LinkedIn: [kassio-barros](https://www.linkedin.com/in/kassio-barros/)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

**Padrão de commits**: Conventional Commits
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

<div align="center">

**Backend completo e pronto para integração com frontend!** ✨

</div>

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Server
PORT=4000

# Database
MONGODB_URI=mongodb://localhost:27017/elitetracker

# GitHub OAuth
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui

# JWT
JWT_SECRET=sua_chave_secreta_aqui_minimo_32_caracteres
JWT_EXPIRATION=7d
```

### Configurando GitHub OAuth

1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Preencha:
   - **Application name**: Elite Tracker
   - **Homepage URL**: `http://localhost:4000`
   - **Authorization callback URL**: `http://localhost:4000/auth/callback`
4. Copie o `Client ID` e `Client Secret` para o `.env`

### Gerando JWT Secret

```bash
# Gere uma chave aleatória segura
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📂 Estrutura do Projeto

```
elitetracker-api/
├── src/
│   ├── controllers/               # Lógica de negócios
│   │   ├── auth.controller.ts     # Autenticação OAuth + JWT
│   │   ├── habits.controller.ts   # CRUD de hábitos
│   │   └── focus.controller.ts    # Gestão de tempo de foco
│   ├── middlewares/               # Middlewares Express
│   │   └── auth.middleware.ts     # Validação JWT
│   ├── schemas/                   # Modelos Mongoose
│   │   ├── habit.model.ts         # Schema de hábitos
│   │   └── focus-times-model.ts   # Schema de focus time
│   ├── database/                  # Configuração MongoDB
│   │   └── index.ts               # Conexão e setup
│   ├── utils/                     # Utilitários
│   │   └── build-validation-error-message.util.ts
│   ├── routes.ts                  # Definição de rotas
│   └── server.ts                  # Entry point
├── dist/                          # Build output (TypeScript compilado)
├── .env                           # Variáveis de ambiente (não versionado)
├── .gitignore                     # Arquivos ignorados pelo Git
├── biome.json                     # Configuração Biome
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências e scripts
├── LICENSE                        # Licença MIT
└── README.md                      # Documentação
```

## 👨‍💻 Autor

**Kássio Barros**
- GitHub: [@devkassio](https://github.com/devkassio)

## 📄 Licença

MIT License - Copyright (c) 2025 Kássio Barros

**Proteções Aplicadas:**
- ✅ Copyright protegido por lei
- ✅ Atribuição obrigatória ao autor original
- ✅ Notificação recomendada para uso comercial
- ✅ Proibido uso de marcas registradas sem autorização

Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

## ⚠️ Aviso Legal

Este software é fornecido "como está", sem garantias. O uso comercial é permitido,
mas requer atribuição clara ao autor original. Cópias não autorizadas que removam
os créditos do autor violam os termos da licença.
