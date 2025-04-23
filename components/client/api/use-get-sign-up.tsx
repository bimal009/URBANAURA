import { InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/lib/hono";

type SignupResponse = {
    message: string;
    data?: {
        id: string;
        username: string | null;
        email: string;
        password: string;
        createdAt: string;
    };
};

type SignupErrorResponse = {
    message: string;
    error?: string;
};

type RequestType = InferRequestType<typeof client.api.signin.$post>['json'];

export const useSignUpMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<SignupResponse, SignupErrorResponse, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.signin.$post({ json });

            if (!response.ok) {
                const errorData = await response.json() as SignupErrorResponse;
                throw new Error(errorData.message || errorData.error || 'Already have an account');
            }

            const data = await response.json() as SignupResponse;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};