import DeuLogoBlue from '../../assets/DeuLogoBlue.png';
import DeuLogoWhite from '../../assets/DeuLogoWhite.png';
import { UseTheme } from '../../modules/ThemeProvider';

const DeuLogo = () => {
  const { isDarkMode } = UseTheme();

  return (
    <div className='logo-container'>
      <img
        src={isDarkMode ? DeuLogoWhite : DeuLogoBlue}
        className='school-logo'
        alt=''
      />
    </div>
  );
};

export default DeuLogo;
