import { prisma } from "../../lib/prisma"

interface dataVideo {
    name: string
    path: string
}

interface dataPrompt {
    title: string
    template: string
}

export class Create {
    async video(data: dataVideo) {
        const video = await prisma.video.create({
            data: {
                name: data.name,
                path: data.path
            }
        })

        return video
    }

    async prompt(data: dataPrompt) {
        const prompt = await prisma.prompt.create({
            data: {
                title: data.title,
                template: data.template
            }
        })

        return prompt
    }
}