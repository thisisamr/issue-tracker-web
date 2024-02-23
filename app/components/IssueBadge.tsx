import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface IssueBadgeProps {
  status: Status;
}
let statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "IN_PROGRESS", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};
export default function IssueBadge({ status }: IssueBadgeProps) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
