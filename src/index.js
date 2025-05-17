import express from 'express'
import cookieParser from 'cookie-parser';
import verifyToken from './middleware/verifyToken.js';
import { PORT } from './config.js'
import { authRouter } from './routes/auth.routes.js';
import { productsRouter } from './routes/products.routes.js';

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(authRouter)

// Protected routes
app.use(verifyToken)
app.use(productsRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
