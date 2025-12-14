# ✅ Checklist de Deploy - EliteTracker

## 📋 Antes de Começar

### Contas Necessárias
- [ ] Conta GitHub
- [ ] Conta MongoDB Atlas
- [ ] Conta Render

---

## 🗄️ MongoDB Atlas

- [ ] Criar cluster FREE (M0)
- [ ] Criar usuário do banco de dados
- [ ] Salvar username e senha
- [ ] Configurar Network Access (0.0.0.0/0)
- [ ] Copiar connection string
- [ ] Substituir `<password>` na connection string
- [ ] Adicionar `/elitetracker` antes do `?`
- [ ] Testar conexão (opcional)

**Connection String Final:**
```
mongodb+srv://USER:PASS@cluster.net/elitetracker?retryWrites=true&w=majority
```

---

## 🔐 GitHub OAuth

- [ ] Ir em github.com/settings/developers
- [ ] Criar New OAuth App
- [ ] Application name: `EliteTracker`
- [ ] Homepage URL: `https://devkassio.github.io/EliteTracker`
- [ ] Authorization callback URL: `https://SEU-APP.onrender.com/auth/callback`
  *(Anotar para atualizar depois com a URL real)*
- [ ] Salvar Client ID
- [ ] Gerar e salvar Client Secret

---

## 🖥️ Render - Backend

### Criar Web Service
- [ ] Login no Render com GitHub
- [ ] New + → Web Service
- [ ] Conectar repositório GitHub
- [ ] Name: `elitetracker-api` (ou outro disponível)
- [ ] Region: Escolher região próxima
- [ ] Branch: `main`
- [ ] Root Directory: `elitetracker-api`
- [ ] Runtime: `Node`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free`

### Variáveis de Ambiente
- [ ] MONGODB_URI = *connection string do MongoDB*
- [ ] JWT_SECRET = *chave aleatória e segura*
- [ ] GITHUB_CLIENT_ID = *Client ID do GitHub OAuth*
- [ ] GITHUB_CLIENT_SECRET = *Client Secret do GitHub OAuth*
- [ ] PORT = `3333`
- [ ] FRONTEND_URL = `https://devkassio.github.io`

### Após Deploy
- [ ] Aguardar deploy completar
- [ ] Copiar URL do serviço (ex: `https://elitetracker-api.onrender.com`)
- [ ] Testar API: acessar `URL/` no navegador

---

## 🔄 Atualizar Configurações

### GitHub OAuth Callback
- [ ] Voltar em github.com/settings/developers
- [ ] Editar OAuth App
- [ ] Atualizar Authorization callback URL com URL real do Render
- [ ] Salvar

### Frontend Environment
- [ ] Abrir `elitetracker-front/.env.production`
- [ ] Atualizar `VITE_API_URL` com URL do Render
- [ ] Salvar arquivo

---

## 🌐 GitHub Pages

### Configurar Repositório
- [ ] Settings → Pages
- [ ] Source: `GitHub Actions`
- [ ] Salvar

### Preparar Deploy
- [ ] Verificar se todos os arquivos foram modificados:
  - [ ] `.env.production` atualizado
  - [ ] `vite.config.ts` com base path
  - [ ] `.github/workflows/deploy.yml` criado

### Deploy
```bash
- [ ] git add .
- [ ] git commit -m "chore: configurar deploy"
- [ ] git push origin main
```

### Verificar
- [ ] Ir em Actions no GitHub
- [ ] Aguardar workflow completar (ícone verde ✓)
- [ ] Acessar: `https://devkassio.github.io/EliteTracker`

---

## 🧪 Testes Finais

### Backend
- [ ] Acessar URL do Render
- [ ] Verificar se retorna algo (não erro 404)
- [ ] Checar logs no Render Dashboard

### Frontend
- [ ] Acessar GitHub Pages URL
- [ ] Abrir DevTools (F12) → Console
- [ ] Verificar se não há erros
- [ ] Testar login com GitHub
- [ ] Criar um hábito
- [ ] Marcar hábito como concluído
- [ ] Testar timer de foco
- [ ] Verificar se dados são salvos
- [ ] Testar logout
- [ ] Testar no mobile (DevTools → Toggle device)

---

## 📝 Informações Importantes

### URLs Finais
```
Frontend: https://devkassio.github.io/EliteTracker
Backend:  https://SEU-APP.onrender.com
MongoDB:  MongoDB Atlas
```

### Credenciais a Manter Seguras
- MongoDB connection string
- JWT Secret
- GitHub Client ID
- GitHub Client Secret

### Limitações Free Tier
- **Render**: Servidor hiberna após 15min inativo
- **MongoDB**: 512MB storage
- **GitHub Pages**: 100GB tráfego/mês

---

## 🆘 Problemas Comuns

| Problema             | O que verificar                                       |
| -------------------- | ----------------------------------------------------- |
| Backend não responde | Aguardar 30-50s (hibernação do Render)                |
| CORS Error           | FRONTEND_URL correto no Render?                       |
| GitHub login falha   | Callback URL atualizado? Client ID/Secret corretos?   |
| 404 no GitHub Pages  | Workflow completou? Base path correto no vite.config? |
| Dados não salvam     | MongoDB connection string correto? Cluster rodando?   |
| Build falha          | Ver logs no Render ou GitHub Actions                  |

---

## 🎉 Deploy Completo!

Se todos os itens estão marcados ✅ e os testes passaram, seu deploy está completo!

**Próximos passos:**
1. Compartilhar a URL com usuários
2. Monitorar logs e erros
3. Considerar upgrade de planos conforme uso cresce
4. Manter variáveis de ambiente seguras

---

**Documentação completa**: [DEPLOY.md](./DEPLOY.md)
**Guia rápido**: [DEPLOY-QUICK.md](./DEPLOY-QUICK.md)
