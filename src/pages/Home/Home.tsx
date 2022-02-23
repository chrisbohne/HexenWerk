import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';

const Home = () => {
  return (
    <div>
      <h1>Welcome to HexFinder</h1>
      <Icon name="hamburger" color="red" size="64" />
      <Button label="Play" />
    </div>
  );
};

export default Home;
