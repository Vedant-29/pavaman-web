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
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

function DefaultSidebar( {collapsable = false}) {
  const [activeItem, setActiveItem] = useState('Employee list');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Employee list', icon: PresentationChartBarIcon, onclick: "/employee-list" },
    { name: 'Inbox', icon: ShoppingBagIcon, onclick: "/employee-list" },
    { name: 'Profile', icon: UserCircleIcon, onclick: "/employee-list" },
    { name: 'Settings', icon: Cog6ToothIcon, onclick: "/employee-list" },
    { name: 'Log Out', icon: PowerIcon, onclick: "/employee-list" },
  ];

  return (
    <div className="flex">
      <Card className={`h-[calc(100vh-56px)] ${collapsable ? 'w-20' : 'w-60'} p-4 shadow-xl shadow-blue-gray-900/5 transition-width duration-300`}>
        <List className="space-y-2">
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              className={`p-2 cursor-pointer flex ${collapsable === true ? "justify-center" : ""} ${
                activeItem === item.name 
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100'
              }`}
              onClick={() => {
                navigate(item.onclick);
                setActiveItem(item.name)
              }}
            >
              <ListItemPrefix>
                <item.icon className={`h-5 w-5 ${collapsable === true ? "mr-0" : "mr-2"}`} />
              </ListItemPrefix>
              {!collapsable && item.name}
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}

export default DefaultSidebar;
