import { Table } from "@radix-ui/themes";
import NextLink from 'next/link'
import IssueLink from "../components/IssueLink";
import { Issue, Status } from "@prisma/client";
import { FaArrowUp } from "react-icons/fa6";
import IssueBadge from "../components/IssueBadge";

export interface IssueQuery {
  status: Status, orderBy: keyof (Issue), page: string
}
interface Props {
  searchParams: IssueQuery, issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (

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
  )
}
const columns: { label: string, value: keyof Issue, className?: string }[] = [{ label: 'Issue', value: 'title' },
{ label: "status", value: 'status', className: "hidden md:table-cell" }, { label: 'Created', value: 'created_at', className: 'hidden md:table-cell' }];

export const columnNames = columns.map(column => column.value)
export default IssueTable
