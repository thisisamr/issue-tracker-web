'use client'
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: "IN_PROGRESS" },
  { label: 'Closed', value: "CLOSED" }
]
export default function IssueStatusFilter() {
  const router = useRouter()
  return (
    <Select.Root onValueChange={(params) => {
      if (params == 'All') {
        router.push(`/issues`)

      } else {
        const query = params ? params : ''
        router.push(`/issues/?status=${query}`)
      }
    }}>
      <Select.Trigger placeholder="filter by status..." />
      <Select.Content>
        {statuses.map(status => (
          <Select.Item key={status.label} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
