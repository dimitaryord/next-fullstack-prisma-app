import prisma from "@/prisma"
import ValidationSchema from "@/schemas/login"

export async function POST(request: Request){
    try{
        const body = await request.json()
        ValidationSchema.parse(body)

        const { name, password } = body

        const user = await prisma.user.findFirst({ where: { name, password }})
        if(!user) return new Response('User not found!', { status: 404, })

        return Response.json({ user })
    }
    catch(error: any) {
        return new Response('Server error!', { status: 500 })
    }
}