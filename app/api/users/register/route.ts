import prisma from "@/prisma"
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

const userSchema = z.object({
    email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Please enter a valid email.' }),
    name: z.string().min(4, { message: 'Name must be at least 4 characters.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.'})
})

export async function POST(request: Request){
    try{
        const body = await request.json()
    
        
        const { email, name, password } = body
    
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(user)
    
        if(user)
            return new Response(null, {
                status: 409,
                statusText: 'User already exists with this email address.'
            })

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const createdUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        })

        console.log(createdUser)

    }
    catch(error){
        return new Response(null, {
            status: 400,
            statusText: 'Server error: ' + error
        })
    }

}