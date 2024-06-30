import React, { useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

function DefaultSidebar() {
  const [activeItem, setActiveItem] = useState('Employee list');

  const menuItems = [
    { name: 'Employee list', icon: PresentationChartBarIcon },
    { name: 'Inbox', icon: ShoppingBagIcon },
    { name: 'Profile', icon: UserCircleIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
    { name: 'Log Out', icon: PowerIcon },
  ];

  return (
    <Card className="h-[calc(100vh-56px)] w-full max-w-[15rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List className="space-y-2">
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            className={`p-2 cursor-pointer ${
              activeItem === item.name
                ? 'bg-blue-500 text-white'
                : 'hover:bg-blue-100'
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <ListItemPrefix>
              <item.icon className="h-5 w-5 mr-2" />
            </ListItemPrefix>
            {item.name}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default DefaultSidebar;
