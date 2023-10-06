'use client'

import Input from "@/components/form/Input"
import { useState } from "react"

import { useRouter } from "next/navigation"

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import ValidationSchema from "@/schemas/register"

type ValidationSchemaType = z.infer<typeof ValidationSchema>

function Register() {
    const router = useRouter()
    const [submitted, setSubmitted] = useState<Boolean>(false)

    const user = useMutation({
        mutationFn: async (checkUser: ValidationSchemaType) => {
            return await axios.post('/api/users/register', checkUser)
        },
        onMutate: () => {
            setSubmitted(true)
        },
        onSuccess: () => {
            // router.push('/')
        },
        onError: (error: any) => {
            
                if (error.response) {
                  // The server responded with an error status code (e.g., 500)
                  console.error("Request failed with status code:", error.response.status);
                  console.error("Error message:", error.response.data);
                } else {
                  // Something went wrong with the request (e.g., network error)
                  console.error("Request failed:", error.message);
                }
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
            <Input type='email' id='email' label = "What is your email?"
                placeholder="Type your email..." errorMessage={errors.email?.message} isError={errors.email !== undefined ? true : false}
                register={register}/>
            <Input type='username' id='name' label = "What will your name be?"
                placeholder="Type your name..." errorMessage={errors.name?.message} isError={errors.name !== undefined ? true : false}
                register={register}/>
            <Input type='password' id='password' label = "What will your password be?"
                placeholder="Type your password..." errorMessage={errors.password?.message} isError={errors.password !== undefined ? true : false}
                register={register}/>
            <button type='submit' className="btn btn-accent">
                {
                    submitted && user.isLoading ? <div className="flex space-x-2">
                        <span className="loading loading-spinner"></span>
                        <div className="flex items-center">Loading</div>
                    </div> : <div>Register</div>
                }
            </button>
        </div>
    </form>
  )
}

export default Register