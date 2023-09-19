import { FastifyRequest, FastifyReply } from 'fastify'
import { Read } from './useCase'

export class ReadController {
    async listPrompt(req: FastifyRequest, reply: FastifyReply) {
        const useCase = new Read()
        const response = await useCase.fetchAllPrompts()
        return reply.status(201).send(response)
    }
}