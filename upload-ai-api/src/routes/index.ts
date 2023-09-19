import { FastifyInstance } from "fastify";
import { PromptsRoute } from "./prompts-route";
import { VideoRoute } from "./video-route";

export async function Routes(app: FastifyInstance) {
    // rotas de Prompt
    app.register(PromptsRoute)

    // rotas de video
    app.register(VideoRoute)
}
