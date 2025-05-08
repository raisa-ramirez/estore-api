import express from 'express'
import { PORT } from './config.js'
import { router } from './routes/products.routes.js';

const app = express();

app.use(express.json())
app.use(router)
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
