
# 🚀 TrackIt - Dockerizado

> Dockerização completa do projeto [TrackIt](https://github.com/Jenil-Vekaria/Trackit) feita por [MiqueiasBueno](https://github.com/MiqueiasBueno).

## 📦 Sobre o Projeto

TrackIt é um sistema para rastreamento e gestão de tickets, projetos e usuários.  
Esse repositório traz a aplicação **totalmente dockerizada**, facilitando o setup e deploy.

---

## 🐳 Dockerização

O projeto foi estruturado com:

- ✅ Dockerfile para o frontend (Next.js)
- ✅ Dockerfile para o backend (Node.js + Express)
- ✅ MongoDB como banco de dados
- ✅ Orquestração via Docker Compose

---

## 🚀 Como rodar localmente com Docker

### 1️⃣ Clone o repositório:

```bash
git clone https://github.com/MiqueiasBueno/TrackIt.git
cd TrackIt
```

### 2️⃣ Crie os arquivos `.env`:

- Arquivo `.env` na raiz:

```env
MONGO_URI=mongodb://mongo:27017/trackit
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- Arquivo `.env` no backend (`/server`):

```env
NODE_ENV=development
MONGO_URI=mongodb://mongo:27017/trackit
PORT=5000
JWT_SECRET=6b8d882e-4dcb-4c3c-b4ea-8a6a7bff86e3
JWT_TOKEN_EXPIRATION=1h
```

- Arquivo `.env` no frontend (`/client`):

```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000
```

### 3️⃣ Suba os containers:

```bash
docker-compose up --build
```

Aguarde até que os serviços estejam rodando.

---

## 🧠 **Povoar o Banco de Dados (Seed)**

Execute o comando abaixo para popular o banco com dados de teste (usuários, permissões, etc):

```bash
docker exec -it trackit_backend npm run seed
```

---

## 🔑 **Informações de Login (Acesso de Teste)**

| Email                               | Senha     | Papel      | Permissões                                  |
| ----------------------------------- | --------- | ---------- | -------------------------------------------- |
| james.smith@bugtracker.com          | password  | Admin      | Gerencia admin, projetos e tickets          |
| michael.smith@bugtracker.com        | password  | Developer  | Gerencia projetos e tickets                 |
| robert.smith@bugtracker.com         | password  | Submitter  | Cria e gerencia tickets                     |

---

## 🖥️ Acesso:

- 🔗 Frontend: [http://localhost:3000](http://localhost:3000)  
- 🔗 Backend API: [http://localhost:5000](http://localhost:5000)  
- 🔗 MongoDB: [localhost:27017](mongodb://localhost:27017)

---

## 🏗️ Estrutura de Pastas

```
TrackIt/
├── client/           # Frontend (Next.js)
├── server/           # Backend (Node.js + Express)
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🙌 Créditos

- Projeto original: [Jenil-Vekaria/Trackit](https://github.com/Jenil-Vekaria/Trackit)
- Dockerização: [MiqueiasBueno](https://github.com/MiqueiasBueno)

---

## 🐙 Licença

Distribuído sob a licença MIT.
