"use client";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMdeReact from "react-simplemde-editor";

export default function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-3 p-2">
      <TextField.Root>
        <TextField.Input placeholder="title" />
      </TextField.Root>
      <SimpleMdeReact placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
}
