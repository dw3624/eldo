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
import { missionContents } from './constants';

const MissionSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="pb-40">
        <SidebarGroup>
          <SidebarGroupLabel>Table Of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {missionContents.map((item, i) => (
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

export default MissionSidebar;
