# 🎯 EliteTracker

Sistema completo de rastreamento de hábitos e gerenciamento de tempo com Pomodoro, desenvolvido com React, TypeScript, Node.js e MongoDB.

## 🌟 Características

### 📋 Gerenciamento de Hábitos
- ✅ Criar, editar e excluir hábitos
- 📅 Calendário customizado com visualização mensal
- 📊 Métricas detalhadas de conclusão
- 🎯 Rastreamento diário de progresso
- 💯 Porcentagem de conclusão por dia

### ⏱️ Timer Pomodoro
- ⏲️ Temporizador configurável (foco e descanso)
- 🎨 Círculo de progresso visual
- ▶️ Controles de play, pause e reset
- 📈 Histórico de sessões
- 📊 Estatísticas de tempo focado

### 🔐 Autenticação
- 🔑 Login com GitHub OAuth
- 👤 Perfil de usuário
- 🔒 Rotas protegidas

### 📱 Responsividade
- 💻 Design desktop completo
- 📱 Interface mobile otimizada
- 🎨 Bottom navigation no mobile
- 🖼️ Layout adaptativo

## 🚀 Tech Stack

### Frontend
- **React 19** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router** - Navegação
- **Axios** - Requisições HTTP
- **Day.js** - Manipulação de datas
- **CSS Modules** - Estilização
- **React Hot Toast** - Notificações

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **MongoDB** - Banco de dados
- **Mongoose** - ODM
- **JWT** - Autenticação
- **Zod** - Validação de schemas

## 🎨 Deploy

**URL da Aplicação**: [https://devkassio.github.io/EliteTracker](https://devkassio.github.io/EliteTracker)

### Stack de Deploy
- 🌐 Frontend: **GitHub Pages**
- 🖥️ Backend: **Render**
- 🗄️ Database: **MongoDB Atlas**

### Guias de Deploy
- 📖 [Guia Completo de Deploy](./DEPLOY.md)
- ⚡ [Guia Rápido (5 passos)](./DEPLOY-QUICK.md)

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 20+
- MongoDB local ou conta no MongoDB Atlas
- Conta GitHub (para OAuth)

### 1. Clone o repositório
```bash
git clone https://github.com/devkassio/EliteTracker.git
cd EliteTracker
```

### 2. Configure o Backend
```bash
cd elitetracker-api
npm install

# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas credenciais
# Veja DEPLOY.md para detalhes sobre MongoDB e GitHub OAuth
```

**Variáveis necessárias** (`.env`):
```env
MONGODB_URI=sua_connection_string_mongodb
JWT_SECRET=sua_chave_secreta
GITHUB_CLIENT_ID=seu_github_client_id
GITHUB_CLIENT_SECRET=seu_github_client_secret
PORT=3333
FRONTEND_URL=http://localhost:5173
```

### 3. Configure o Frontend
```bash
cd ../elitetracker-front
npm install

# O .env já está configurado para localhost
# VITE_API_URL=http://localhost:3333
```

### 4. Inicie os servidores

**Terminal 1 - Backend:**
```bash
cd elitetracker-api
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd elitetracker-front
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 📁 Estrutura do Projeto

```
EliteTracker/
├── elitetracker-api/          # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/       # Controladores de rotas
│   │   ├── database/          # Configuração MongoDB
│   │   ├── middlewares/       # Middlewares (auth, etc)
│   │   ├── schemas/           # Models Mongoose
│   │   ├── utils/             # Utilitários
│   │   ├── routes.ts          # Definição de rotas
│   │   └── server.ts          # Entrada da aplicação
│   ├── package.json
│   └── tsconfig.json
│
├── elitetracker-front/        # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── hooks/             # Custom hooks (useUser)
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── routes/            # Configuração de rotas
│   │   ├── services/          # API client (axios)
│   │   ├── styles/            # Estilos globais
│   │   ├── app.tsx            # Componente raiz
│   │   └── main.tsx           # Entrada da aplicação
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD GitHub Actions
│
├── DEPLOY.md                  # Guia completo de deploy
├── DEPLOY-QUICK.md            # Guia rápido de deploy
└── README.md                  # Este arquivo
```

## 🎯 Funcionalidades Detalhadas

### Página de Hábitos
- Lista de hábitos do usuário
- Criação rápida de novos hábitos
- Checkbox para marcar conclusão diária
- Calendário mensal com indicadores visuais
- Métricas de:
  - Total de hábitos criados
  - Dias com 100% de conclusão
  - Percentual de conclusão do dia selecionado
- Detalhes do dia: lista de hábitos concluídos/não concluídos

### Página de Foco (Pomodoro)
- Configuração de tempo de foco (1-60 min)
- Configuração de tempo de descanso (1-30 min)
- Timer circular com progresso visual
- Status: "Em Foco" / "Em Descanso"
- Botões de controle: Iniciar, Pausar, Continuar, Resetar
- Salvamento automático de sessões
- Calendário com dias com sessões de foco
- Métricas:
  - Total de minutos focados
  - Sessões completas
  - Tempo médio por sessão
- Histórico detalhado por dia

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Senhas não armazenadas (OAuth)
- ✅ CORS configurado
- ✅ Validação de dados (Zod)
- ✅ Proteção de rotas
- ✅ Variáveis de ambiente

## 📝 Scripts Disponíveis

### Frontend
```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview do build
npm run lint       # Verificar código
npm run format     # Formatar código
npm run deploy     # Deploy manual (gh-pages)
```

### Backend
```bash
npm run dev        # Servidor de desenvolvimento (watch mode)
npm run build      # Compilar TypeScript
npm start          # Iniciar servidor de produção
npm run lint       # Verificar código
npm run format     # Formatar código
npm run typecheck  # Verificar tipos
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Kássio Barros**
- GitHub: [@devkassio](https://github.com/devkassio)

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Render](https://render.com/)
- [GitHub Pages](https://pages.github.com/)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
# Deploy
