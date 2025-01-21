import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Home, MapPin, BarChart, Settings, MoreVertical } from 'lucide-react'

const TopBar: React.FC = () => {
  return (
    <header className='topbar bg-white rounded-lg shadow-md p-4 flex items-center'>
      {/* Logo */}
      <div className='flex-none'>
        <span className='text-xl font-bold'>ColdChain Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className='flex-grow flex justify-center ml-10'>
        <ul className='topbar-menu flex space-x-8'>
          <li className='flex items-center'>
            <Button variant='secondary' className='flex items-center'>
              <Home className='w-5 h-5 mr-2' />
              Overview
            </Button>
          </li>
          <li className='flex items-center'>
            <Button variant='secondary' className='flex items-center'>
              <MapPin className='w-5 h-5 mr-2' />
              Facility Map
            </Button>
          </li>
          <li className='flex items-center'>
            <Button variant='secondary' className='flex items-center'>
              <BarChart className='w-5 h-5 mr-2' />
              Analytics
            </Button>
          </li>
        </ul>
      </nav>

      {/* Profile and Settings */}
      <div className='flex-none flex items-center space-x-4 ml-10'>
        <div className='profile-item flex items-center'>
          <div className='profile-icon w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-black'>
            <span className='font-medium'>CC</span>
          </div>
          <div className='ml-2 text-black'>
            <div className='font-bold text-sm'>Admin User</div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant='secondary'>
              <MoreVertical className='w-5 h-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Settings className='w-4 h-4 mr-2' />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default TopBar;
