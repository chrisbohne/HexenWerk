import { logoutUser } from '../../services/auth.service';

const Home = () => {
  const test = async () => {
    const user = await logoutUser();
    console.log(user);
  };

  return (
    <div>
      <h1>Welcome to HexFinder</h1>
      <button onClick={test}>Logout</button>
    </div>
  );
};

export default Home;
