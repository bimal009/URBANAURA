import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.signin.$post>;
type RequestType = InferRequestType<typeof client.api.signin.$post>['json']

export const useSignInMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.signin.$post({ json });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signin"] });
        },
    });
};
