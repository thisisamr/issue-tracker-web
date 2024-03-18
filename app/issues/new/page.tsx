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
import { z } from "zod";
import ErrorMsg from "@/app/components/ErrorMsg";
import Spinner from "@/app/components/spinner";
import { redirect_to_issues_page } from "@/app/actions";
type IssueForm = z.infer<typeof create_issue_schema>;
export default function NewIssuePage(props: Function) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(create_issue_schema) });
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
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
            setSubmitting(true);
            await axios.post("/api/issues", data);
            setSubmitting(false);
            await redirect_to_issues_page("/issues");
            router.push("/issues");
            //                        window.location.replace("http://localhost:3000/issues/")
          } catch (error) {
            console.log(error);
            //FIXME:handle error with a toaster
            setSubmitting(false);
            setError("an unexpected error occured");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="title" {...register("title")} />
        </TextField.Root>
        <ErrorMsg>{errors.title?.message}</ErrorMsg>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} ref={null} />
          )}
        />
        <ErrorMsg>{errors.description?.message}</ErrorMsg>
        <Button disabled={submitting} type="submit">
          Submit New Issue
          {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
