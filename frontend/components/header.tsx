import React from "react";
import { RssIcon, Moon, Linkedin } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  itemsNav: itemNav[];
}

const Header = ({
  title = "My Blog",
  itemsNav = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ],
}: HeaderProps) => {
  return (
    <div>
      <header className="border-b border-secondary shadow-sm fixed top-0 left-0 right-0 bg-background z-10">
        <div className="container mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LogoBlog title={title} />
            <NavbarHeaderLeft itemsNav={itemsNav} />
          </div>
          <NavbarHeaderRight linkedinUrl={""} />
        </div>
      </header>
      <div className="h-14"></div>
    </div>
  );
};

export interface itemNav {
  name: string;
  url: string;
}

export default Header;
function NavbarHeaderRight({ linkedinUrl }: { linkedinUrl: string }) {
  return (
    <div className="flex items-center space-x-4">
      <a href={linkedinUrl} className="text-gray-600 hover:text-gray-900">
        <Linkedin className="h-5 w-5" />
      </a>
      <a>
        <Moon className="h-5 w-5" />
      </a>
    </div>
  );
}

function NavbarHeaderLeft({ itemsNav }: { itemsNav: itemNav[] }) {
  return (
    <nav className="hidden sm:flex space-x-4">
      {itemsNav.map((itemNav, index) => (
        <Link
          key={index}
          href={itemNav.url}
          className="text-gray-600 hover:text-gray-900"
        >
          {itemNav.name}
        </Link>
      ))}
    </nav>
  );
}
function LogoBlog({ title }: { title: string }) {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <RssIcon className="h-5 w-5" />
      <span className="font-semibold text-lg">{title}</span>
    </Link>
  );
}
