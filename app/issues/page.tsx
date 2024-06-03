import prisma from "@/prisma/client";
import IssueToolbar from "./IssuesToolbar";
import { Flex } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { IssueQuery, columnNames as columns } from './IssueTable'
export default async function Issues({ searchParams }: { searchParams: IssueQuery }) {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = columns.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
  const pageSize = 10;
  const _page = parseInt(searchParams.page) || 1
  let issues = await prisma?.issue.findMany({
    where: {
      status
    }, orderBy, skip: (_page - 1) * pageSize, take: pageSize
  });

  let count = await prisma.issue.count({
    where: {
      status
    }, orderBy
  })
  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={_page} itemCount={count} />
    </Flex >
  );
}
