import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { helpContents } from './constants';

const HelpSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="pb-40">
        <SidebarGroup>
          <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpContents.map((item, i) => (
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

export default HelpSidebar;
