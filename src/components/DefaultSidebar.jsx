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
import {useAuth} from "../hooks/auth";

function DefaultSidebar( {collapsable = false}) {
  const [activeItem, setActiveItem] = useState('Employee list');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const [showLogOutPopup, setShowLogOutPopup] = useState(false);
  const { signOut } = useAuth();


  const menuItems = [
    { name: 'Employee list', icon: PresentationChartBarIcon, onclick: () => navigate("/employee-list") },
    { name: 'Inbox', icon: ShoppingBagIcon, onclick: () => navigate("/inbox") },
    { name: 'Profile', icon: UserCircleIcon, onclick: () => navigate("/profile") },
    { name: 'Settings', icon: Cog6ToothIcon, onclick: () => navigate("/settings") },
    { name: 'Log Out', icon: PowerIcon, onclick: () => setShowLogOutPopup(true) }, // Toggle popup for logout
  ];

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div className="flex">
      {showLogOutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="text-lg flex items-center justify-between font-medium mb-3 px-6 py-4 shadow-custom-light relative">
              <div>Log out</div>
              <div className="w-8 h-8 flex items-center justify-center bg-transparent text-white " onClick={() => setShowSignUpPopup(false)}>
                <RxCross2 className="text-[#E75A5A]" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-4 px-6">
              <div className="text-center">
                Are you sure you want to log out? You will be redirected to the homepage upon logging out.
              </div>
            </div>
            <div className="flex justify-end px-6 pb-6 mt-4">
              <div
                className="focus:outline-none w-full flex items-center justify-center bg-white px-6 px-6 lg:px-11 py-2.5 text-[#E75A5A] rounded-md cursor-pointer font-medium sm:text-xs lg:text-base"
                onClick={() => setShowLogOutPopup(false)}
              >
                Cancel
              </div>
              <div
                className="focus:outline-none ml-2 w-full flex items-center justify-center bg-[#E75A5A] px-6 px-6 lg:px-11 py-2.5 text-white rounded-md cursor-pointer font-medium sm:text-xs lg:text-base"
                onClick={handleSignOut}
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
      )}
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
                item.onclick(); // Execute the onclick function
                if (item.name !== 'Log Out') {
                  setActiveItem(item.name);
                }
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
