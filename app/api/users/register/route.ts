import prisma from "@/prisma"
import ValidationSchema from "@/schemas/register"

export async function POST(request: Request){
    try{
        const body = await request.json()
        ValidationSchema.parse(body)

        const { email, name, password } = body

        const usedEmail = await prisma.user.findUnique({ where: { email } })
        if(usedEmail) return new Response("Email already in use.", { status: 409 })

        const usedName = await prisma.user.findUnique({ where: { name } })
        if(usedName) return new Response("Name already in use.", { status: 409 })

        const createdUser = await prisma.user.create({
            data: { email, name, password },
        })

        return Response.json({ createdUser })
    }
    catch(error){
        return new Response('Server error!', { status: 500 })
    }
}