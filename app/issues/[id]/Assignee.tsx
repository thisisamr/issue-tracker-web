'use client'

import Skeleton from "@/app/components/Skeleton"
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'
export default function Assignee({ issue }: { issue: Issue }) {
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
    <>
      <Select.Root defaultValue={issue.assignedto || ""} onValueChange={(userid) => {
        axios.patch(`/api/issues/${issue.id}`, { userid: userid.length > 1 ? userid : null }).catch((e) => {
          toast.error('could not save changes')
        })
      }}>
        <Select.Trigger placeholder="Assign ...">

        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>
              Suggestion
            </Select.Label>
            <Select.Item value=" ">
              Unassigned
            </Select.Item>
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
      <Toaster />
    </>
  )
}
