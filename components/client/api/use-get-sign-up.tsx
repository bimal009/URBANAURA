import { useMutation, useQueryClient } from "@tanstack/react-query"

// Define the request body type
type SignUpRequest = {
    email: string
    password: string
    username?: string
}

type SignupResponse = {
    message: string
    data?: {
        id: string
        username: string | null
        email: string
        password: string
        createdAt: string
    }
}

type SignupErrorResponse = {
    error: string
}

export const useSignUpMutation = () => {
    const queryClient = useQueryClient()

    return useMutation<SignupResponse, SignupErrorResponse, SignUpRequest>({
        mutationFn: async (json) => {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })

            if (!response.ok) {
                const errorData = await response.json() as SignupErrorResponse
                throw new Error(errorData.error || 'Failed to register user')
            }

            const data = await response.json() as SignupResponse
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            console.error('Signup error:', error)
        },
    })
}
