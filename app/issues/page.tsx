"use client";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Issues() {
  const router = useRouter()
  return (
    <div className="p-3">
      <Button onClick={()=>router.push("/issues/new")}>New Issue</Button>
    </div>
  );
}
