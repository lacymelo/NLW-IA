import { FastifyReply, FastifyRequest } from "fastify";
import { videoBodySchema, videoParamsSchema } from "../../utils/validate";
import { Read } from "../read/useCase";
import { createReadStream } from "node:fs";
import { openai } from "../../lib/openai";
import { Update } from "./useCase";

export class UpdateController {
    async updateVideo(req: FastifyRequest, reply: FastifyReply) {
        const { videoId } = videoParamsSchema.parse(req.params)
        const { prompt } = videoBodySchema.parse(req.body)

        //buscar video
        const read = new Read()
        const video = await read.fetchVideo(videoId)

        //path do video
        const videoPath = video.path

        //leitura do áudio
        const audioReadStream = createReadStream(videoPath)

        //transcrição do áudio
        const textTranscription = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt,
        })

        // atualizando a transcrição do vídeo
        const update = new Update()
        const response = await update.video({ videoId, transcription: textTranscription.text })

        return reply.status(201).send(response)
    }
}