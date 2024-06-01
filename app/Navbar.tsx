"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
export default function Navbar() {
  const { data: session, status } = useSession()
  console.log(status, session)
  let nav_items = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const location = usePathname();
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <BsBugFill />
            </Link>
            <ul className="flex space-x-6">
              {nav_items.map((i) => (
                <Link
                  className={classnames({
                    "text-zinc-500": i.href == location,
                    "text-zinc-700": i.href != location,
                    "hover:text-zinc-900 transition-colors": true,
                  })}
                  key={i.href}
                  href={i.href}
                >
                  {i.label}
                </Link>
              ))}
            </ul>
          </Flex>
          <Box>

            {status == 'authenticated' && (<Link href={'/api/auth/signout'}>Log out</Link>)}
            {status == 'unauthenticated' && (<Link href={'/api/auth/signin'}>Singin</Link>)}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
