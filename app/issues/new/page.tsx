"use client";
import dyn from "next/dynamic";
const SimpleMdeReact = dyn(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { create_issue_schema } from "@/app/ValidationSchemas";
import {z} from 'zod'
type IssueForm = z.infer<typeof create_issue_schema>
export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit,formState:{errors} } = useForm<IssueForm>({resolver:zodResolver(create_issue_schema)});
  const [error, setError] = useState<string>();
  return (
    <div className="max-w-xl p-2">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <FaCircleInfo />

            {/* <InfoCircledIcon /> */}
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            //FIXME:handle error with a toaster
            setError("an unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="title" {...register("title")} />
        </TextField.Root>
        {errors.title&&<Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (

            <SimpleMdeReact placeholder="Description" {...field} ref={null}/>

          )}
        />
        {errors.description&&<Text  color="red" as="p">{errors.description.message}</Text>}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}
