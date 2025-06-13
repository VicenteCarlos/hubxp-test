# 📚 Livraria HubXP

![Livraria HubXP](https://i.imgur.com/vTSqN7M.png)

Uma aplicação moderna de gerenciamento de livros construída com Next.js e NestJS.

## 🚀 Funcionalidades

- ✨ Interface moderna e responsiva
- 📝 CRUD completo de livros
- 🔍 Busca por nome e autor
- ⭐ Filtro de livros mais bem avaliados
- 📱 Design responsivo
- 📄 Paginação
- 🌙 Tema dark por padrão

## 🛠️ Tecnologias Utilizadas

### Frontend
- Next.js 14
- TypeScript
- TailwindCSS
- Shadcn/ui
- React Query
- Axios
- React Hook Form
- Yup

### Backend
- NestJS
- MongoDB
- TypeScript
- Class Validator
- Class Transformer

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (versão 5 ou superior)
- Git

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/hubxp.git
cd hubxp
```

### 2. Configurando o Backend

```bash
# Entre na pasta do backend
cd hub-xp.api

# Instale as dependências
npm install

# Crie o arquivo .env
cp .env.example .env

# Configure as variáveis de ambiente no arquivo .env
# Exemplo:
# MONGODB_URI=mongodb://localhost:27017/hubxp
# PORT=3333
```

### 3. Configurando o Frontend

```bash
# Entre na pasta do frontend
cd ../hub-xp.web

# Instale as dependências
npm install

# Crie o arquivo .env.local
cp .env.example .env.local

# Configure as variáveis de ambiente no arquivo .env.local
# Exemplo:
# NEXT_PUBLIC_API_URL=http://localhost:3333
```

## 🚀 Executando o Projeto

### 1. Iniciando o Backend

```bash
# Na pasta hub-xp.api
npm run start:dev
```

O servidor estará rodando em `http://localhost:3333`

### 2. Iniciando o Frontend

```bash
# Na pasta hub-xp.web
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📝 Estrutura do Projeto

### Frontend (hub-xp.web)
```
src/
├── app/              # Páginas e componentes específicos de rota
├── components/       # Componentes reutilizáveis
├── lib/             # Utilitários e configurações
├── network/         # Configuração de API e hooks
└── shared/          # Tipos e interfaces compartilhadas
```

### Backend (hub-xp.api)
```
src/
├── commons/         # Utilitários e configurações comuns
├── modules/         # Módulos da aplicação
│   └── books/      # Módulo de livros (controllers, services, etc)
└── main.ts         # Arquivo principal da aplicação
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Se você tiver alguma dúvida ou encontrar algum problema, por favor abra uma [issue](https://github.com/seu-usuario/hubxp/issues). 
