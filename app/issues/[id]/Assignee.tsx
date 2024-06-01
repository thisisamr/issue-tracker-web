'use client'

import { Select } from "@radix-ui/themes"

export default function Assignee() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign ...">

      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>
            Suggestion
          </Select.Label>
          <Select.Item value="1">
            Amr khalil
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
