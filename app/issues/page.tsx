// import "easymde/dist/easymde.min.css";
import prisma from "@/prisma/client";
import IssueToolbar from "./IssuesToolbar";
import { Link, Table } from "@radix-ui/themes";
import { IssueLink, IssueBadge } from "@/app/components";
import { Status } from "@prisma/client";
export default async function Issues({ searchParams }: { searchParams: { status: Status } }) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  let issues = await prisma?.issue.findMany({
    where: {
      status
    }
  });

  return (
    <div className="p-3">
      <IssueToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Isuue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
}
