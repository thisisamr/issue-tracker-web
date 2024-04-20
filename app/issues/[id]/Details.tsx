import { IssueBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export default function Details({ issue }: { issue: Issue }) {
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueBadge status={issue.status} />
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt={"4"}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
}
