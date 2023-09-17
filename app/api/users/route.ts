import prisma from "@/prisma"


export async function GET(request: Request){
    await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
          password: '123'
        },
      })

    const users = await prisma.user.findMany()
    console.log(users)

    return new Response('hello')
}