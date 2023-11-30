'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { People, ViewList } from '@mui/icons-material';
import { Link } from '@/components';
import { Urls } from '@/config';
import { LEFT_MENU_WIDTH } from './config';
import { usePathname } from 'next/navigation';

export default function LeftMenu() {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: LEFT_MENU_WIDTH,
        flexShrink: 0,
        zIndex: 0,
        '& .MuiDrawer-paper': {
          width: LEFT_MENU_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN} selected={pathname === Urls.ADMIN}>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Seznamy her" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_USERS} selected={pathname === Urls.ADMIN_USERS}>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Uživatelé" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
