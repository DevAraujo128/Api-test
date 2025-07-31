# API Node.js com JWT e Prisma

Uma API RESTful desenvolvida em Node.js com autenticação JWT, banco de dados MongoDB usando Prisma ORM.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT (JSON Web Token)** - Autenticação e autorização
- **Prisma** - ORM para banco de dados
- **MongoDB** - Banco de dados NoSQL
- **bcrypt** - Criptografia de senhas
- **CORS** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd api-node-jwt
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="mongodb://localhost:27017/api-jwt"
   JWT_SECRET="sua-chave-secreta-aqui"
   ```

4. **Configure o banco de dados**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicie o servidor**
   ```bash
   node server.js
   ```

O servidor estará rodando em `http://localhost:3000`

## 📚 Estrutura do Projeto

```
Api-test/
├── middlewares/
│   └── auth.js          # Middleware de autenticação JWT
├── routes/
│   ├── public.js        # Rotas públicas (registro e login)
│   └── private.js       # Rotas privadas (requerem autenticação)
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── server.js            # Arquivo principal do servidor
└── package.json         # Dependências do projeto
```

## 🔐 Endpoints da API

### Rotas Públicas

#### POST `/register`
Registra um novo usuário.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "João Silva",
  "email": "joao@email.com",
  "passwordHash": "hash_da_senha"
}
```

#### POST `/login`
Autentica um usuário e retorna um token JWT.

**Body:**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Rotas Privadas (Requerem Autenticação)

#### GET `/listUser`
Lista todos os usuários cadastrados.

**Headers:**
```
Authorization: Bearer <seu-token-jwt>
```

**Resposta:**
```json
{
  "message": "Usúarios listados com sucesso",
  "users": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "João Silva",
      "email": "joao@email.com"
    }
  ]
}
```

## 🔒 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação:

1. **Login**: O usuário faz login e recebe um token JWT válido por 7 dias
2. **Acesso às rotas privadas**: Inclua o token no header `Authorization: Bearer <token>`
3. **Validação**: O middleware `auth.js` verifica a validade do token

## 🗄️ Banco de Dados

O projeto utiliza MongoDB com Prisma ORM. O schema define um modelo `User` com:

- `id`: Identificador único (ObjectId)
- `name`: Nome do usuário
- `email`: Email único do usuário
- `passwordHash`: Senha criptografada com bcrypt

## 🛠️ Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Sincronizar schema com o banco
npx prisma db push

# Abrir interface do Prisma Studio
npx prisma studio
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão com o MongoDB
- `JWT_SECRET`: Chave secreta para assinatura dos tokens JWT

### Exemplo de configuração completa:

```env
DATABASE_URL="mongodb://localhost:27017/api-jwt"
JWT_SECRET="minha-chave-super-secreta-123"
```

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Configure as variáveis de ambiente no servidor
2. Instale as dependências: `npm install`
3. Execute as migrações: `npx prisma db push`
4. Inicie o servidor: `node server.js`

## 📝 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo de APIs com Node.js, JWT e Prisma.

---

**Nota**: Certifique-se de alterar a `JWT_SECRET` em produção para uma chave segura e única. 