import { z } from 'zod'

const videoParamsSchema = z.object({
    videoId: z.string().uuid()
})

const videoBodySchema = z.object({
    prompt: z.string()
})

const promptBodySchema = z.object({
    videoId: z.string().uuid(),
    template: z.string(),
    temperatura: z.number().min(0).max(1).default(0.5),
})

export {
    videoParamsSchema,
    videoBodySchema,
    promptBodySchema
}