import IssueBadge from "@/app/components/IssueBadge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import prisma from "@/prisma/client";
export default async function IssueDetailesPage(props: {
  params: { id: string };
}) {
  // if (typeof (props.params.id != "number")) return notFound();
  const n = parseInt(props.params.id);
  if (isNaN(n)) {
    return notFound();
  }
  let issue = await prisma?.issue.findUnique({
    where: { id: parseInt(props.params.id) },
  });
  if (!issue) return notFound();
  else {
    return (
      <div className="m-3">
        <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my={"2"}>
          <IssueBadge status={issue.status} />
          <Text>{issue.created_at.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt={"4"}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    );
  }
}
