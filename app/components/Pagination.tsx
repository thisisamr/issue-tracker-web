'use client'
import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from "react-icons/bs"

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}



export default function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter()
  const sp = useSearchParams()

  const changePage = (page: number) => {
    const params = new URLSearchParams(sp)
    params.set('page', page.toString())
    router.push("/issues?" + params.toString())
  }
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) return null;
  return (
    <Flex align="center" gap={"2"}>
      <Text size={"1"}>Page {currentPage} of {pageCount}</Text>
      <Button variant="soft" disabled={currentPage == 1} onClick={() => changePage(1)}><BsChevronDoubleLeft /></Button>
      <Button variant="soft" disabled={currentPage == 1} onClick={() => changePage(currentPage - 1)}><BsChevronLeft /></Button>
      <Button variant="soft" disabled={currentPage == pageCount} onClick={() => changePage(currentPage + 1)}><BsChevronRight /></Button>
      <Button variant="soft" disabled={currentPage == pageCount} onClick={() => changePage(pageCount)}><BsChevronDoubleRight /></Button>
    </Flex>
  )

}
