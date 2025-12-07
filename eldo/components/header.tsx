'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ButtonGroup } from './ui/button-group';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const navList: { label: string; href: string }[] = [
  {
    label: 'Sectors',
    href: '/sectors',
  },
  {
    label: 'Menu2',
    href: '/',
  },
  {
    label: 'Menu3',
    href: '/',
  },
  {
    label: 'Menu4',
    href: '/',
  },
  {
    label: 'Company',
    href: '/company',
  },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-100 h-13 w-full border-b border-solid bg-white">
      <div className="px-6 py-2">
        <div className="flex items-center gap-4">
          <Link href="/">
            <b>ELDO</b>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navList.map((navItem) => (
                <NavigationMenuItem key={navItem.label}>
                  <NavigationMenuLink asChild>
                    <Link href={navItem.href}>{navItem.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex gap-2">
            <ButtonGroup className="items-center">
              <Button variant={'link'} size={'sm'} className="cursor-pointer">
                <Link href={'/help'}>Help</Link>
              </Button>
              |
              <Button variant={'link'} size={'sm'} className="cursor-pointer">
                <Link href={'/contact'}>Contact</Link>
              </Button>
            </ButtonGroup>
            <Select defaultValue={'en'}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
