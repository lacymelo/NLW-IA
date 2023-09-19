import { FastifyReply, FastifyRequest } from "fastify"
import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { pipeline } from "node:stream"
import { promisify } from "node:util"
import { Create } from "./useCase"
import { promptBodySchema } from "../../utils/validate"
import { Read } from "../read/useCase"
import { openai } from "../../lib/openai"

const pump = promisify(pipeline)

export class CreateController {
    async createVideo(req: FastifyRequest, reply: FastifyReply) {
        const data = await req.file()

        if (!data) {
            return reply.status(400).send({ error: 'Missing file input' })
        }

        //recupera a extensão do arquivo
        const extension = path.extname(data.filename)

        //verifica se a extensão é do tipo .mp3
        if (extension !== '.mp3') {
            return reply.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
        }

        // nome original do arquivo
        const fileBaseName = path.basename(data.filename, extension)

        // gerando um novo nome para o arquivo
        const fileUploadName = `${fileBaseName}-${randomUUID()}-${extension}`

        // diretório onde o arquivo será salvo
        const uploadDestination = path.resolve(__dirname, '../../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        const create = new Create()
        const response = await create.video({ name: data.filename, path: uploadDestination })

        return reply.status(201).send(response)
    }

    async createPrompt(req: FastifyRequest, reply: FastifyReply) {
        const { videoId, template, temperatura } = promptBodySchema.parse(req.body)

        // buscar o vídeo
        const read = new Read()
        const video = await read.fetchVideo(videoId)

        if (!video.transcription) {
            return reply.status(400).send({ error: 'Video transcription was not generated yet.' })
        }

        // substituindo o texto da transcrição
        const promptMessage = template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature: temperatura,
            messages: [
                { role: 'user', content: promptMessage }
            ]
        })



        return response
    }
}