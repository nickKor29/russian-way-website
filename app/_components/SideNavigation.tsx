"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Главная",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Мои туры",
    href: "/account/tours",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Мои отзывы",
    href: "/account/reviews",
    icon: <ChatBubbleLeftIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Мой профиль",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="border-r border-primary-900 flex flex-col h-full max-md:hidden">
      <ul className="flex flex-col gap-2 flex-grow">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto mb-4">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
