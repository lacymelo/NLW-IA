import { prisma } from "../../lib/prisma"

interface dataVideo {
    videoId: string
    transcription: string
}

export class Update {
    async video(data: dataVideo) {
        const video = await prisma.video.update({
            where: {
                id: data.videoId
            },
            data: {
                transcription: data.transcription
            }
        })

        return video
    }
}