# Elite Tracker API

API para o Elite Tracker - Sistema de rastreamento de elite

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset JavaScript tipado
- **Biome** - Linter e Formatter
- **MongoDB** - Banco de dados (planejado)

## 📦 Instalação

```bash
npm install
```

## 🔧 Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Verificar tipos TypeScript
npm run typecheck

# Formatar e lint
npm run check
```

## 🏗️ Build

```bash
# Compilar TypeScript
npm run build

# Executar em produção
npm run start
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm run start` - Inicia servidor em produção
- `npm run check` - Lint + format + fix
- `npm run lint` - Apenas lint
- `npm run format` - Apenas formatação
- `npm run typecheck` - Verifica tipos sem compilar

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
PORT=4000
```

## 📂 Estrutura do Projeto

```
elitetracker-api/
├── src/
│   └── server.ts       # Servidor Express
├── dist/               # Build output
├── .env                # Variáveis de ambiente
├── biome.json          # Configuração Biome
├── tsconfig.json       # Configuração TypeScript
└── package.json
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
