import cors from 'cors';
import express from 'express';
import auth from './middlewares/auth.js';
import privateRoutes from './routes/private.js';
import publicRoutes from './routes/public.js';

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)

app.listen(3000, () => console.log("Server running on 🚀"))