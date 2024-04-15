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
      <Grid className="m-3" columns={{ initial: "1", md: "2" }} gap="5">
        <Details issue={issue} />
        <EditButton id={`${issue.id}`} />
      </Grid>
    );
  }
}
