import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear the auth cookie - using await since cookies() returns a Promise
    const cookieStore = await cookies();
    
    // Delete the token cookie
    cookieStore.delete({
      name: "token",
      path: "/", // Important: must match the path used when setting
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error server-side
    console.error("Error during logout:", error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: "Failed to logout" },
      { status: 500 }
    );
  }
}