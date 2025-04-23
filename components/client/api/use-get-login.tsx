import { InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/lib/hono";

type LoginResponse = {
    message: string;
    token: string;
} | {
    error: string;
};

type RequestType = InferRequestType<typeof client.api.login.$post>['json'];

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.login.$post({ json });
            const data = await response.json() as LoginResponse;

            if (!response.ok) {
                throw new Error('Login failed');
            }

            if ('token' in data) {
                localStorage.setItem("token", data.token);
                return data;
            } else {
                throw new Error(data.error || "Login failed");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] });
        },
    });
};
