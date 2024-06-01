'use client'

import Skeleton from "@/app/components/Skeleton"
import { User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Assignee() {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

  if (error) return null
  if (isLoading) {
    return <Skeleton />
  }
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
