"use client"
import { useSignUpMutation } from "@/components/client/api/use-get-sign-up";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

type SigninInputs = {
    email: string;
    password: string;
    username: string;
    id?: string;
};

export default function Page() {
    const router = useRouter()
    const { mutate: signIn, isPending, isSuccess, isError, data: signUpData } = useSignUpMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninInputs>();

    const onSubmit: SubmitHandler<SigninInputs> = (data) => {
        console.log("Sign Up Data:", data);
        signIn(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Account created successfully!");
            // Redirect after a brief delay to let the user see the success toast
            const redirectTimeout = setTimeout(() => {
                router.push("/login");
            }, 1500);

            return () => clearTimeout(redirectTimeout);
        }

        if (isError) {
            toast.error("Error creating account. Please try again.");
        }
    }, [isSuccess, isError, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border border-border"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-1">Urbanaura</h1>
                    <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-medium text-muted-foreground">Create A New Account</h2>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-foreground">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        {...register("username", { required: "Username is required" })}
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                    {errors.username && (
                        <p className="text-destructive text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-foreground">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                    {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-foreground">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                    {errors.password && (
                        <p className="text-destructive text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? "Signing up..." : "Sign up"}
                </button>

                <div className="flex justify-center items-center text-center text-sm text-muted-foreground pt-2">
                    <Link href="/login" className="hover:text-primary hover:underline transition">
                        Already Have Account
                    </Link>
                </div>
            </form>
        </div>
    );
}