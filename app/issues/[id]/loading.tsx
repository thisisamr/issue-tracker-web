"use client";
import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import { usePathname } from "next/navigation";

export default function LoadingIssueDetails() {
  const p = usePathname();

  if (!p.includes("edit")) {
    return (
      <Box className="m-3 max-w-xl">
        <Skeleton />
        <Flex gap={"3"} my={"2"}>
          <Skeleton width={"5rem"} />
          <Skeleton width={"8rem"} />
        </Flex>
        <Card className="prose" mt={"4"}>
          <Skeleton count={3} />
        </Card>
      </Box>
    );
  } else {
    return null;
  }
}
