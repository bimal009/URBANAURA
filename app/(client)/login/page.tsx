"use client"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>();

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log("Login Data:", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border border-border"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-1">Urbanaura</h1>
                    <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-medium text-muted-foreground">Login Now</h2>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-foreground">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
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
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition duration-200 font-medium"
                >
                    Login
                </button>

                <div className="flex justify-between text-sm text-muted-foreground pt-2">
                    <Link href="/forget-password" className="hover:text-primary hover:underline transition">
                        Forgot Password?
                    </Link>
                    <Link href="/register" className="hover:text-primary hover:underline transition">
                        Create Account
                    </Link>
                </div>
            </form>
        </div>
    );
}