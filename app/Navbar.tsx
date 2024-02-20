import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
export default function Navbar() {
  let nav_items = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        <BsBugFill />
      </Link>
      <ul className="flex space-x-6">
        {nav_items.map((i) => (
          <Link
            className="hover:text-slate-500 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
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
