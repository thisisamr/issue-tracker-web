import { Status } from "@prisma/client";
import NextLink from "next/link";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
export default function IssueSummary({ open, inProgress, closed }: Props) {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"4"}>
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction={"column"} gap={"1"}>
            <NextLink
              className="text-sm font-medium"
              href={`issues?status=${status.status}`}
            >
              {status.label}
            </NextLink>
            <Text size={"5"} className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
