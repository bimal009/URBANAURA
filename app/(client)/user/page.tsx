"use client"
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { fetchUserProfile } from "../../../utils/api";

type UserProfile = {
  email: string;
  username: string;
};

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const user = await fetchUserProfile();
        setUserProfile({
          username: user.username,
          email: user.email,
        });
      } catch (e: any) {
        toast.error(e.message || "Failed to load user profile");
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6 border border-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-1">Urbanaura</h1>
          <div className="h-1 w-16 bg-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-muted-foreground">User Profile</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-foreground">Username</label>
            <div className="w-full px-4 py-3 border border-input rounded-md bg-muted text-foreground">
              {userProfile.username}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-foreground">Email</label>
            <div className="w-full px-4 py-3 border border-input rounded-md bg-muted text-foreground">
              {userProfile.email}
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
         
        </div>
      </div>
    </div>
  );
}