"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
export default function Navbar() {
  let nav_items = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const location = usePathname();
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <BsBugFill />
      </Link>
      <ul className="flex space-x-6">
        {nav_items.map((i) => (
          <Link
            className={classnames({
              "text-zinc-500 dark:text-zinc-100": i.href == location,
              "text-zinc-400": i.href != location,
              "hover:text-zinc-800  dark:hover:text-zinc-100 transition-colors":
                true,
            })}
            key={i.href}
            href={i.href}
          >
            {i.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
