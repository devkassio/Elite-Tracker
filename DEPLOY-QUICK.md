# EliteTracker - Deploy Rápido

## 🎯 Resumo Executivo

**Stack de Deploy:**
- 🌐 **Frontend**: GitHub Pages (gratuito)
- 🖥️ **Backend**: Render (gratuito)
- 🗄️ **Database**: MongoDB Atlas (gratuito)

---

## ⚡ Deploy em 5 Passos

### 1️⃣ MongoDB Atlas (5 minutos)
```
1. Criar conta em mongodb.com/cloud/atlas
2. Criar cluster FREE
3. Criar usuário do banco
4. Permitir acesso de qualquer IP (0.0.0.0/0)
5. Copiar connection string
```

### 2️⃣ GitHub OAuth (3 minutos)
```
1. Ir em github.com/settings/developers
2. New OAuth App
3. Homepage: https://devkassio.github.io/EliteTracker
4. Callback: https://SEU-APP.onrender.com/auth/callback
5. Copiar Client ID e Secret
```

### 3️⃣ Render - Backend (10 minutos)
```
1. Criar conta em render.com
2. New Web Service → Conectar GitHub repo
3. Root Directory: elitetracker-api
4. Build: npm install && npm run build
5. Start: npm start
6. Adicionar variáveis de ambiente:
   - MONGODB_URI
   - JWT_SECRET
   - GITHUB_CLIENT_ID
   - GITHUB_CLIENT_SECRET
   - FRONTEND_URL=https://devkassio.github.io
```

### 4️⃣ Atualizar Configs (2 minutos)
```bash
# Editar elitetracker-front/.env.production
VITE_API_URL=https://SEU-APP.onrender.com

# Atualizar GitHub OAuth callback URL com a URL real do Render
```

### 5️⃣ GitHub Pages (2 minutos)
```bash
# No repositório GitHub → Settings → Pages
# Source: GitHub Actions

# Fazer push
git add .
git commit -m "chore: deploy"
git push origin main
```

---

## 📝 Variáveis de Ambiente

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.net/elitetracker?retryWrites=true&w=majority
JWT_SECRET=chave_super_secreta_aleatoria
GITHUB_CLIENT_ID=seu_github_client_id
GITHUB_CLIENT_SECRET=seu_github_client_secret
PORT=3333
FRONTEND_URL=https://devkassio.github.io
```

### Frontend (`.env.production`)
```env
VITE_API_URL=https://elitetracker-api.onrender.com
```

---

## 🔗 URLs Finais

- **App**: https://devkassio.github.io/EliteTracker
- **API**: https://SEU-APP.onrender.com
- **Banco**: MongoDB Atlas

---

## ⚠️ Importante

1. **Render Free**: Servidor hiberna após 15min → primeira requisição demora ~30-50s
2. **MongoDB Free**: 512MB de storage
3. **GitHub Pages**: Site é público

---

## 🆘 Problemas Comuns

| Problema           | Solução                             |
| ------------------ | ----------------------------------- |
| API não responde   | Aguardar 30-50s (Render hibernando) |
| CORS error         | Verificar FRONTEND_URL no Render    |
| GitHub OAuth falha | Verificar callback URL              |
| Build falha        | Verificar logs no Render/Actions    |

---

**📖 Guia completo**: [DEPLOY.md](./DEPLOY.md)
