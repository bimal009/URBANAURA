import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth cookie - using await since cookies() returns a Promise
  const cookieStore = await cookies();
  cookieStore.delete({
    name: "token",
    path: "/", // Important: must match the path used when setting
  });

  return NextResponse.json({ success: true });
}