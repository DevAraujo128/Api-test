import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient()
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

// Register
router.post('/register', async (req, res) => {

  try {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const userDB = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    })
    
    res.status(201).json(userDB)
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" })
  }
})

// Login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Busca o usúario no banco de dados
    const user = await prisma.user.findUnique({
      where: { 
        email 
      },
    })

    // Verifica se o usúario existe
    if (!user) {
      res.status(404).json({ message: "Usúario não encontrado" })
    }

    // Compara a senha do banco com a que o usúario digitou
    const isMatch = await bcrypt.compare(password, user.passwordHash)

    if (!isMatch) {
      return res.status(400).json({ message: "Senha Inválida" })
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json(token)

  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" })
  }
})


export default router



