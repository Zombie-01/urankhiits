"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";

export function Select({
  className,
  setTheme,
  theme,
  themes,
  room,
  rooms,
  setRoom,
}: {
  className?: string;
  setTheme: any;
  setRoom: any;
  theme: any;
  themes: any;
  room: any;
  rooms: any;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={cn("z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item={theme}>
          <div className="flex flex-col space-y-4 text-sm">
            {themes.map((e: string) => (
              <HoveredLink onClick={() => setTheme(e)}>{e}</HoveredLink>
            ))}
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item={room}>
          <div className="flex flex-col space-y-4 text-sm">
            {rooms.map((e: string) => (
              <HoveredLink onClick={() => setRoom(e)}>{e}</HoveredLink>
            ))}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
