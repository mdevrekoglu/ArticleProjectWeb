import { UseTheme } from '../../../theme/ThemeProvider';

const DeuPatternBackground = () => {
  const { isDarkMode } = UseTheme();

  return (
    <svg
      width='100%'
      height='100%'
      style={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}
    >
      <defs>
        <pattern
          id='deu-pattern'
          width='200'
          height='150'
          patternUnits='userSpaceOnUse'
          patternTransform='rotate(45)'
        >
          <text
            x='10'
            y='50'
            fontFamily='Arial'
            fontSize='40'
            fill={isDarkMode ? '#fff' : '#000'}
          >
            DEU
          </text>
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill='url(#deu-pattern)' />
    </svg>
  );
};

export default DeuPatternBackground;
