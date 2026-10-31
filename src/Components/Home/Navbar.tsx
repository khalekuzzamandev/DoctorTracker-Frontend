import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
   <div>
    <h1>sadf</h1>
      <div>
        <Image src={'/icon.png'}
          alt='Doctor Tracker'
          width={80}
          height={80} />
      </div>
   </div>
    
  );
};

export default Navbar;