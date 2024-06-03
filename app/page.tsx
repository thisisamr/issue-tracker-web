import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";
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

  return <IssueSummary closed={closed} open={open} inProgress={inProgress} />;
  // return <LatestIssues />
}
