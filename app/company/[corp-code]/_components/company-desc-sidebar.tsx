import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const CompanyDescSidebar = ({
  contents,
}: {
  contents: { id: string; title: string }[];
}) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <ButtonGroup>
          <Input placeholder="Search..." />
          <Button
            variant={'outline'}
            aria-label="Search"
            className="cursor-pointer"
          >
            <SearchIcon />
          </Button>
        </ButtonGroup>
      </SidebarHeader>
      <SidebarContent className="pb-40">
        <SidebarGroup>
          <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contents.map((item, i) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton>
                    <Link href={`#${item.id}`}>
                      {i + 1}. {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CompanyDescSidebar;
