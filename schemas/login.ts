import { z } from "zod"

const ValidationSchema = z.object({
    name: z.string().min(4, { message: 'Name must be at least 4 characters.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.'})
})

export default ValidationSchema