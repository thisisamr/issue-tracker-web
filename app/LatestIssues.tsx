import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import { IssueBadge } from "./components"
import NextLink from 'next/link'



export default async function LatestIssues() {
  let latest = await prisma.issue.findMany({
    orderBy: { created_at: 'desc' }
    , take: 5, include: {
      user: true
    }
  })

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latest.map((issue) => {
            return <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <NextLink href={`/issues/${issue.id}`} >
                      {issue.title}
                    </NextLink>
                    <IssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedto && <Avatar radius="full" size={"2"} src={issue.user?.image || ''} fallback="?" />}
                </Flex>
              </Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
