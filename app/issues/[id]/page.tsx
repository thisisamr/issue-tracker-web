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
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function IssueDetailesPage(props: {
  params: { id: string };
}) {
  // if (typeof (props.params.id != "number")) return notFound();
  const session = await getServerSession(authOptions)
  console.log(session)
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
      <Grid className="m-3" columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <Details issue={issue} />
        </Box>
        {session && <Box>
          <Flex direction={"column"} gap={"3"}>
            <EditButton id={`${issue.id}`} />
            <DeleteButton id={issue.id} />
          </Flex>
        </Box>}
      </Grid>
    );
  }
}
