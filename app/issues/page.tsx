import prisma from "@/prisma/client";
import IssueToolbar from "./IssuesToolbar";
import { Link, Table } from "@radix-ui/themes";
import NextLink from 'next/link'
import { IssueLink, IssueBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { FaArrowUp } from "react-icons/fa6";
import Pagination from "../components/Pagination";
export default async function Issues({ searchParams }: { searchParams: { status: Status, orderBy: keyof (Issue), page: string } }) {

  const columns: { label: string, value: keyof Issue, className?: string }[] = [{ label: 'Issue', value: 'title' },
  { label: "status", value: 'status', className: "hidden md:table-cell" }, { label: 'Created', value: 'created_at', className: 'hidden md:table-cell' }];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
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
    <div className="p-3">
      <IssueToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column => (

              <Table.ColumnHeaderCell key={column.label} className={column.className}>
                <NextLink href={{
                  query: {
                    ...searchParams, orderBy: column.value
                  }
                }}>
                  {column.label}
                </NextLink>
                {column.value == searchParams.orderBy && <FaArrowUp className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues?.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <IssueLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </IssueLink>
                  <div className="block md:hidden">
                    <IssueBadge status={issue.status as Status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell ">
                  <IssueBadge status={issue.status as Status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.created_at.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={_page} itemCount={count} />
    </div >
  );
}
