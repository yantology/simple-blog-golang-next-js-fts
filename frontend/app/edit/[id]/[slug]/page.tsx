"use client";

import { use } from "react";
import MarkdownEditor from "@/components/markdown_editor";
import { CardContent, CardMd } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditPost({
  params,
}: {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}) {
  const resolvedParams = use(params);

  return (
    <div className="container w-full md:max-w-4xl mx-auto med:px-4 py-8 flex-1">
      <CardMd>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold">
              Post Title
            </Label>
            <Input id="title" type="text" defaultValue={resolvedParams.slug} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="font-semibold">
              Post Content
            </Label>
            <MarkdownEditor />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </CardContent>
      </CardMd>
    </div>
  );
}
