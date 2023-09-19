import { prisma } from "../../lib/prisma"

export class Read {
    async fetchAllPrompts() {
        const prompts = await prisma.prompt.findMany()

        return prompts
    }

    async fetchVideo(videoId: string) {
        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoId
            }
        })

        return video
    }
}