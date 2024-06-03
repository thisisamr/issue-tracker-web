'use client'
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: "IN_PROGRESS" },
  { label: 'Closed', value: "CLOSED" }
]
export default function IssueStatusFilter() {
  const router = useRouter()
  const sp = useSearchParams()
  return (
    <Select.Root defaultValue={sp.get('status') || undefined} onValueChange={(status) => {
      const params = new URLSearchParams()
      if (status) params.append('status', status)
      if (sp.get('orderBy')) params.append('orderBy', sp.get('orderBy')!)

      if (status == 'All') {
        router.push(`/issues` + sp.get('orderBy') ? `?orderBy=${sp.get('orderBy')}` : '')
      } else {
        const query = params ? params : ''
        router.push(`/issues/?${params.toString()}`)
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
