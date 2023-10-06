'use client'

import Input from "@/components/form/Input"
import { useState } from "react"

import { useRouter } from "next/navigation"

import {
    useMutation,
} from '@tanstack/react-query'
import axios from 'axios'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const ValidationSchema = z.object({
    // email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Please enter a valid email.' }),
    name: z.string().min(4, { message: 'Name must be at least 4 characters.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.'})
})

type ValidationSchemaType = z.infer<typeof ValidationSchema>

function Login() {
    const router = useRouter()
    const [submitted, setSubmitted] = useState<Boolean>(false)

    const user = useMutation({
        mutationFn: async (checkUser: ValidationSchemaType) => {
            return await axios.post('/api/users/login', checkUser)
        },
        onMutate: () => {
            setSubmitted(true)
        },
        onSuccess: () => {
            router.push('/')
        },
        onError: (err: any) => {
            console.error(err)
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
        resolver: zodResolver(ValidationSchema)
    })

    const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
        user.mutate(data)
    }

  return (
    <form onSubmit= {handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs space-y-8">
            <Input type='username' id='name' label = "What is your name?"
                placeholder="Type your name..." errorMessage={errors.name?.message} isError={errors.name !== undefined ? true : false}
                register={register}/>
            <Input type='password' id='password' label = "What is your password?"
                placeholder="Type your password..." errorMessage={errors.password?.message} isError={errors.password !== undefined ? true : false}
                register={register}/>
            <button type='submit' className="btn btn-accent">
                {
                    submitted && user.isLoading ? <div className="flex space-x-2">
                        <span className="loading loading-spinner"></span>
                        <div className="flex items-center">Loading</div>
                    </div> : <div>Login</div>
                }
            </button>
        </div>
    </form>
  )
}

export default Login