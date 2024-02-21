"use client";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";

export default function Issues() {
  return (
    <div className="p-3">
      <Button>New Issue</Button>
    </div>
  );
}
