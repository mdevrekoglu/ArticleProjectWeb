import React from 'react';
import DeuLogoLight from '../assets/DeuLogoLight.png';
import DeuLogoDark from '../assets/DeuLogoDark.png';
import { UseTheme } from '../theme/ThemeProvider';

const DeuLogo = () => {
  const { isDarkMode } = UseTheme();

  return (
    <div className='logo-container'>
      <img
        src={isDarkMode ? DeuLogoDark : DeuLogoLight}
        className='school-logo'
        alt=''
      />
    </div>
  );
};

export default DeuLogo;
