"use client";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import Skeleton from "./components/Skeleton";
export default function Navbar() {
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
            <UserAvatar />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}


const UserAvatar = () => {
  const { status, data: session } = useSession()
  if (status == 'loading') {
    return <Skeleton circle width={"1.75rem"} height={"1.75rem"} />
  }
  return <>
    {
      status == 'authenticated' && (<DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar className="cursor-pointer" src={session.user!.image as string} fallback="?" radius="full" size={"2"} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="2">

            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
          </Text>
          <DropdownMenu.Item>

            {status == 'authenticated' && (<Link href={'/api/auth/signout'}>Log out</Link>)}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>)
    }
    {
      status == 'unauthenticated' && (<Link href="/api/auth/signin" >Sign in</Link>)
    }
  </>

}
