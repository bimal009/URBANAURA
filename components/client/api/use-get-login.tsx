import { useMutation, useQueryClient } from "@tanstack/react-query"

type LoginResponse = {
    message: string
    token: string
}

type LoginErrorResponse = {
    error: string
}

type LoginRequest = {
    email: string
    password: string
}

export const useLoginMutation = () => {
    const queryClient = useQueryClient()

    return useMutation<LoginResponse, LoginErrorResponse, LoginRequest>({
        mutationFn: async (json) => {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(json),
            })

            // Check if the response is successful
            if (!response.ok) {
                const errorData = await response.json() as LoginErrorResponse
                throw new Error(errorData.error || "Login failed")
            }

            // If successful, parse the JSON and check for token
            const data = await response.json() as LoginResponse
            if (data.token) {
                localStorage.setItem("token", data.token) // Save the token in localStorage
                return data
            } else {
                throw new Error("Login failed, no token received.")
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] })
        },
        onError: (error: LoginErrorResponse) => {
            console.error("Login Error:", error.error)
        }
    })
}
