import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export default async function Home() {
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap={"3"}>
        <Flex direction={"column"} gap={"3"}>
          <IssueSummary closed={closed} open={open} inProgress={inProgress} />;
          <IssueChart closed={closed} open={open} inProgress={inProgress} />;
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker-Dashboard",
  description: "view a summary of project issues",
};
