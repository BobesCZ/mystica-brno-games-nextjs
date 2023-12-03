'use client';

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Add, People, ViewList } from '@mui/icons-material';
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
            <ListItemIcon sx={{ minWidth: 44 }}>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="Seznamy her" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_NEW} selected={pathname === Urls.ADMIN_NEW}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Nový seznam" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} href={Urls.ADMIN_USERS} selected={pathname === Urls.ADMIN_USERS}>
            <ListItemIcon sx={{ minWidth: 44 }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Uživatelé" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
