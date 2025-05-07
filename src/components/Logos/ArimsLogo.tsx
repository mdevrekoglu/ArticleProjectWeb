import './styles.css';
import Arims from '../../assets/Arims.png';
import { useIntl } from 'react-intl';
import commonResources from '../../messages';

interface ArimsLogoProps {
  collapsed: boolean;
}

const ArimsLogo: React.FC<ArimsLogoProps> = ({ collapsed }) => {
  const intl = useIntl();

  return (
    <div className='arims-container'>
      <img
        src={Arims}
        className={collapsed ? 'arims-logo-small' : 'arims-logo'}
        alt=''
      />
      {!collapsed && (
        <h1 className='arims-title'>
          {intl.formatMessage(commonResources.arims)}
        </h1>
      )}
    </div>
  );
};

export default ArimsLogo;
