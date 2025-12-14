# 🚀 Guia de Deploy - EliteTracker

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Render](https://render.com) (gratuita)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuita)
- Node.js 20+ instalado localmente

---

## 🗄️ Parte 1: Configurar MongoDB Atlas

### 1.1 Criar Cluster
1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta ou faça login
3. Clique em **"Build a Database"**
4. Escolha o plano **FREE** (M0)
5. Selecione uma região próxima (ex: São Paulo)
6. Clique em **"Create Cluster"**

### 1.2 Criar Usuário do Banco
1. No menu lateral, vá em **"Database Access"**
2. Clique em **"Add New Database User"**
3. Escolha **"Password"**
4. Defina um username e senha forte (anote!)
5. Em **"Database User Privileges"**, escolha **"Read and write to any database"**
6. Clique em **"Add User"**

### 1.3 Configurar IP de Acesso
1. No menu lateral, vá em **"Network Access"**
2. Clique em **"Add IP Address"**
3. Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Clique em **"Confirm"**

### 1.4 Obter Connection String
1. Volte para **"Database"**
2. Clique em **"Connect"** no seu cluster
3. Escolha **"Connect your application"**
4. Copie a connection string (formato: `mongodb+srv://...`)
5. **Substitua** `<password>` pela senha do usuário
6. **Adicione** o nome do banco: `/elitetracker` antes do `?`
   - Exemplo: `mongodb+srv://user:pass@cluster.mongodb.net/elitetracker?retryWrites=true&w=majority`

---

## 🔐 Parte 2: Configurar GitHub OAuth

### 2.1 Criar OAuth App
1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Clique em **"OAuth Apps"** → **"New OAuth App"**
3. Preencha:
   - **Application name**: EliteTracker
   - **Homepage URL**: `https://devkassio.github.io/EliteTracker`
   - **Authorization callback URL**: `https://SEU-APP.onrender.com/auth/callback`
     *(Substitua SEU-APP pelo nome que você vai criar no Render)*
4. Clique em **"Register application"**
5. **Anote** o **Client ID**
6. Clique em **"Generate a new client secret"**
7. **Anote** o **Client Secret** (só aparece uma vez!)

---

## 🖥️ Parte 3: Deploy do Backend (Render)

### 3.1 Criar Conta no Render
1. Acesse [Render](https://render.com)
2. Faça login com GitHub

### 3.2 Criar Web Service
1. No dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório do GitHub
3. Configure:
   - **Name**: `elitetracker-api` (ou outro nome disponível)
   - **Region**: Escolha uma região próxima
   - **Branch**: `main`
   - **Root Directory**: `elitetracker-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3.3 Configurar Variáveis de Ambiente
No Render, vá em **"Environment"** e adicione:

```
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/elitetracker?retryWrites=true&w=majority
JWT_SECRET=uma_chave_secreta_muito_segura_e_aleatoria_aqui
GITHUB_CLIENT_ID=seu_github_client_id
GITHUB_CLIENT_SECRET=seu_github_client_secret
PORT=3333
FRONTEND_URL=https://devkassio.github.io
```

### 3.4 Deploy
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (pode levar alguns minutos)
3. **Anote a URL** do seu serviço (ex: `https://elitetracker-api.onrender.com`)

---

## 🌐 Parte 4: Deploy do Frontend (GitHub Pages)

### 4.1 Atualizar Variável de Ambiente
1. Abra `elitetracker-front/.env.production`
2. Substitua a URL pela URL do Render:
   ```
   VITE_API_URL=https://SEU-APP.onrender.com
   ```

### 4.2 Atualizar GitHub OAuth Callback
1. Volte no [GitHub OAuth App](https://github.com/settings/developers)
2. Edite seu OAuth App
3. Atualize **"Authorization callback URL"** com a URL real do Render:
   ```
   https://SEU-APP.onrender.com/auth/callback
   ```
4. Salve

### 4.3 Configurar GitHub Pages
1. No seu repositório do GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **"Source"**, selecione **"GitHub Actions"**

### 4.4 Fazer Push e Deploy
```bash
# No diretório raiz do projeto
git add .
git commit -m "chore: configurar deploy"
git push origin main
```

O GitHub Actions vai automaticamente buildar e fazer deploy!

### 4.5 Verificar Deploy
1. Vá em **Actions** no seu repositório
2. Aguarde o workflow terminar (ícone verde ✓)
3. Acesse: `https://devkassio.github.io/EliteTracker`

---

## 🔄 Atualizações Futuras

### Atualizar Backend
O Render faz deploy automático quando você faz push na branch `main`:
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

### Atualizar Frontend
O GitHub Actions faz deploy automático quando você faz push na branch `main`:
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

---

## ⚠️ Importante

### Render Free Tier
- O servidor "hiberna" após 15 minutos de inatividade
- Primeira requisição após hibernação pode demorar 30-50 segundos
- Para resolver: considere upgrade para plano pago ou usar outro serviço

### MongoDB Atlas Free Tier
- 512 MB de armazenamento
- Cluster pode ser pausado se não usado por 60 dias

### GitHub Pages
- Site público (não pode ser privado)
- Limite de 100 GB de tráfego por mês

---

## 🐛 Troubleshooting

### Backend não inicia no Render
- Verifique os logs no Render Dashboard
- Confirme se todas as variáveis de ambiente estão corretas
- Verifique se a connection string do MongoDB está correta

### Frontend não carrega API
- Confirme se VITE_API_URL está correto no `.env.production`
- Verifique CORS no backend (deve incluir a URL do GitHub Pages)
- Abra DevTools (F12) e veja o Console para erros

### GitHub OAuth não funciona
- Confirme se a callback URL está correta no GitHub OAuth App
- Verifique se CLIENT_ID e CLIENT_SECRET estão corretos no Render

---

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do Render
2. Console do navegador (F12)
3. Network tab para ver requisições
4. Status do MongoDB Atlas

---

## ✅ Checklist Final

- [ ] MongoDB Atlas criado e connection string salva
- [ ] GitHub OAuth App criada com Client ID e Secret
- [ ] Backend deployado no Render com variáveis de ambiente
- [ ] URL do Render anotada
- [ ] `.env.production` atualizado com URL do Render
- [ ] GitHub OAuth callback atualizado com URL do Render
- [ ] GitHub Pages configurado
- [ ] Push feito e Actions executando
- [ ] Site acessível em `https://devkassio.github.io/EliteTracker`

---

**Pronto! Sua aplicação está no ar! 🎉**
