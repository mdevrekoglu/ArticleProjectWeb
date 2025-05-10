import DeuPatternBackground from '../Authentication/components/DeuPatternBackground';

const Home = () => {
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <DeuPatternBackground />
      </div>

      {/* <div>{}</div> */}
    </div>
  );
};

export default Home;
