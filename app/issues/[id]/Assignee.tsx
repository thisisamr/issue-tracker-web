'use client'

import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Assignee() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchusers = async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data)
    }
    fetchusers();
  }, [])
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign ...">

      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>
            Suggestion
          </Select.Label>
          {users?.map((user) => {
            return (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            )
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
