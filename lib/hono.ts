import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const client = hc<AppType>(apiUrl);

export default client;
