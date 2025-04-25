import { useMutation, useQueryClient } from "@tanstack/react-query"

type LoginResponse = {
    message: string
    token: string
    role: string
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
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(json),
                })

                const data = await response.json()

                // Check if the response is successful
                if (!response.ok) {
                    throw {
                        error: data.error || "Login failed. Please check your credentials."
                    } as LoginErrorResponse
                }

                // If successful, check for token
                if (data.token) {
                    // Save the token in localStorage
                    localStorage.setItem("token", data.token)
                    // Save the role in localStorage for client-side role checks
                    localStorage.setItem("role", data.role)
                    return data as LoginResponse
                } else {
                    throw {
                        error: "Login failed. No token received."
                    } as LoginErrorResponse
                }
            } catch (error) {
                // Handle network errors or other unexpected errors
                if (error instanceof Error) {
                    throw {
                        error: error.message || "An unexpected error occurred during login."
                    } as LoginErrorResponse
                }
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] })
        },
        onError: (error: LoginErrorResponse) => {
            console.error("Login Error:", error.error)
            // You can add additional error handling here, like showing a toast notification
        }
    })
}
