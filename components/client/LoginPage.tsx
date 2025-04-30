"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "@/lib/hooks/useAuth";

type LoginInputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    // Redirect away if already authenticated
    useAuth(true, redirectTo);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        console.log("Login Data:", data);
        setIsLoading(true);
        setIsError(false);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Login failed");
            }

            const responseData = await response.json();

            // Save token to localStorage for client-side auth
            localStorage.setItem("token", responseData.token);

            setIsSuccess(true);
        } catch (err) {
            console.error("Login error:", err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successful!");
            // Redirect after a brief delay to let the user see the success toast
            const redirectTimeout = setTimeout(() => {
                router.push(redirectTo);
                router.refresh(); // Force a refresh to update the auth state across the app
            }, 1500);

            return () => clearTimeout(redirectTimeout);
        }

        if (isError) {
            toast.error("Invalid email or password. Please try again.");
        }
    }, [isSuccess, isError, router, redirectTo]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border border-border"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-1">Urbanaura</h1>
                    <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-medium text-muted-foreground">
                        Login to Your Account
                    </h2>
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
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                    />
                    {errors.email && (
                        <p className="text-destructive text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-foreground">
                        Password
                    </label>
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
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition duration-200 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>

                <div className="flex justify-center items-center text-center text-sm text-muted-foreground pt-2">
                    <Link
                        href="/signup"
                        className="hover:text-primary hover:underline transition"
                    >
                        Create a New Account
                    </Link>
                </div>
            </form>
        </div>
    );
}
