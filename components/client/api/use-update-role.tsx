import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateRoleRequest = {
    userId: string;
    role: "user" | "admin";
};

type UpdateRoleResponse = {
    message: string;
    data: {
        id: string;
        username: string | null;
        email: string;
        role: string;
        createdAt: string;
    };
};

type UpdateRoleErrorResponse = {
    error: string;
};

export const useUpdateRoleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateRoleResponse, UpdateRoleErrorResponse, UpdateRoleRequest>({
        mutationFn: async (json) => {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("No token found");
            }

            const response = await fetch("/api/admin/update-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(json),
            });

            if (!response.ok) {
                const errorData = await response.json() as UpdateRoleErrorResponse;
                throw new Error(errorData.error || "Failed to update role");
            }

            const data = await response.json() as UpdateRoleResponse;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}; 