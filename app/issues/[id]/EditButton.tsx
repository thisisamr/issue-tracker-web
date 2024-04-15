import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function EditButton({ id }: { id: string }) {
  return (
    <Box>
      <Button>
        <HiOutlinePencilAlt />
        <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
      </Button>
    </Box>
  );
}
