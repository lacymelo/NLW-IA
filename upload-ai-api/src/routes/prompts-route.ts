import { FastifyInstance } from 'fastify'
import { ReadController } from '../modules/read/controller'
import { fastifyMultipart } from "@fastify/multipart"
import { CreateController } from '../modules/create/controller'

const readController = new ReadController()
const createController = new CreateController()

export async function PromptsRoute(app: FastifyInstance) {
    // rotas
    app.get('/prompts', readController.listPrompt)

    // create prompt
    app.post('/ai/complete', createController.createPrompt)
}