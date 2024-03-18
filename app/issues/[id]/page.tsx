import { notFound } from "next/navigation";

export default async function IssueDetailesPage(props: {
  params: { id: string };
}) {
  if (typeof (props.params.id != "number")) return notFound();
  let issue = await prisma?.issue.findUnique({
    where: { id: parseInt(props.params.id) },
  });
  if (!issue) notFound();
  else {
    return (
      <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.created_at.toDateString()}</p>
      </div>
    );
  }
}
