import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
const IssueForm = dynamic(
  () => {
    return import("@/app/issues/_components/IssueForm");
  },
  { ssr: false }
);
interface Props {
  params: { id: string };
}
export default async function Edit({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return notFound();
  }
  return <IssueForm issue={issue} />;
}
