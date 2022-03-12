import { useRefreshToken } from '../../hooks';

const Home = () => {
  const refresh = useRefreshToken();
  return (
    <div>
      <h1>Welcome to HexFinder</h1>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default Home;
