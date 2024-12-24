/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { CardHeader, CardContent, CardMd } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileMeta {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  coverUrl?: string;
}

interface ProfileCardProps {
  profile: ProfileMeta;
  className?: string;
  onSave?: (updatedProfile: ProfileMeta) => void;
  children: React.ReactNode;
}

const ProfileCard = ({
  profile: initialProfile,
  className,
  onSave,
  children,
}: ProfileCardProps) => {
  const [profile, setProfile] = useState(initialProfile);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    if (onSave) {
      onSave(editedProfile);
    }
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsDialogOpen(false);
  };

  return (
    <>
      <CardMd className={cn("w-full bg-card rounded-none", className)}>
        <div className="h-48 md:h-64 relative">
          <img
            src={profile.coverUrl || "https://placehold.co/1200x400"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <CardHeader className="relative ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <Avatar className="h-32 w-32 border-4 border-background -mt-16">
                <AvatarImage
                  src={profile.imageUrl || "https://placehold.co/128"}
                  alt={profile.name}
                />
                <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                Edit Profile
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold">{profile.name}</h2>
              <p className="text-lg text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          <p className="text-muted-foreground">{profile.bio}</p>
        </CardHeader>

        <CardContent>
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-4">Recent Posts</h3>
            {children}
          </div>
        </CardContent>
      </CardMd>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={editedProfile.role}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, role: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editedProfile.bio}
                onChange={(e) =>
                  setEditedProfile({ ...editedProfile, bio: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCard;
