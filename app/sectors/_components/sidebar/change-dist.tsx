'use client';

import { useAtom, useSetAtom } from 'jotai';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { graphFilterAtom, setSpecificFilterAtom } from '../../atom';
import { CHANGE_DIST_ITEMS } from '../constants';

const ChangeDistMenu = () => {
  const [graphFilter] = useAtom(graphFilterAtom);
  const setSpecificFilter = useSetAtom(setSpecificFilterAtom);
  const specific = graphFilter.specific.changeDist;

  const handleVarChange = (value: string) => {
    setSpecificFilter({
      type: 'changeDist',
      partial: { varKey: value },
    });
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Variable</SidebarGroupLabel>
      <SidebarGroupContent>
        <Select value={specific.varKey} onValueChange={handleVarChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {CHANGE_DIST_ITEMS.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ChangeDistMenu;
