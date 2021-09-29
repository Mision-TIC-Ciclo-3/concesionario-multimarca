import React from 'react';
import TriggerDarkMode from './TriggerDarkMode';

const Sidebar = () => {
  return (
    <nav className='w-72 border border-gray-300 h-full flex flex-col justify-between'>
      <TriggerDarkMode />
    </nav>
  );
};

export default Sidebar;
