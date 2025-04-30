import { Suspense } from "react";
import LoginPage from "@/components/client/LoginPage"; // adjust the path if needed

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
        </Suspense>
    );
}
