import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listUser', async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json({ message: "Usúarios listados com sucesso", users })
  } catch (err) {
    res.status(500).json({ message: 'Falha no servidor, tente novamente' })
  }
})


export default router