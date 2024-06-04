import IssueBadge from "@/app/components/IssueBadge";
import { GoPencil } from "react-icons/go";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import prisma from "@/prisma/client";
import { number } from "zod";
import Link from "next/link";
import { Status } from "@prisma/client";
import { HiOutlinePencil, HiOutlinePencilAlt } from "react-icons/hi";
import Details from "./Details";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import Assignee from "./Assignee";
import { cache } from "react";
import { authOptions } from "@/lib";
interface Props {
  params: { id: string };
}

const fetch_issue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  }),
);
export default async function IssueDetailesPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const n = parseInt(params.id);
  if (isNaN(n)) {
    return notFound();
  }
  const issue = await fetch_issue(parseInt(params.id));

  if (!issue) return notFound();
  else {
    return (
      <Grid className="m-3" columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <Details issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction={"column"} gap={"3"}>
              <Assignee issue={issue} />
              <EditButton id={`${issue.id}`} />
              <DeleteButton id={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    );
  }
}

// export async function generateMetadata({ params }: Props) {
//   const issue = await fetch_issue(parseInt(params.id));
//   return {
//     title: issue?.title,
//     description: issue?.description,
//   };
// }
