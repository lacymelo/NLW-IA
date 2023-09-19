import dotenv from 'dotenv'
import fastify from "fastify"
import { fastifyCors } from "@fastify/cors"
import { fastifyMultipart } from "@fastify/multipart"
import { Routes } from "./routes"

dotenv.config()

const app = fastify()

// permite o acesso as rotas da api
app.register(fastifyCors, {
    origin: '*'
})

//configurando as permissões do arquivo de upload
app.register(fastifyMultipart, {
    limits: {
        fileSize: 1_048_576 * 25, // 25mb
    }
})

app.register(Routes)

app.listen({ port: 3333 }).then(() => {
    console.log('Server is running at a port 3333!')
})