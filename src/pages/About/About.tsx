import styles from './About.module.scss';
import CityPreview from '../../assets/images/cities/City.svg';
import TownPreview from '../../assets/images/cities/Town.svg';
import VillagePreview from '../../assets/images/cities/Village.svg';
import SightPreview from '../../assets/images/cities/Sight.svg';
import Example from '../../assets/images/Example.svg';
import Zwo from '../../assets/images/2.png';

export const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.aboutHeader}>
        <h1>About HexFinder</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          vestibulum ligula, et faucibus nisl. In nec maximus eros, in tempus
          massa. <br />
          Pellentesque viverra nunc libero, eget bibendum neque aliquet non.
          Donec volutpat porta venenatis. Ut eu enim a libero rhoncus lacinia.
          Proin sodales a ante non mollis. <br /> Donec quis porttitor massa.
          Nam feugiat dignissim augue nec posuere. Aliquam elit lectus, rutrum
          ac malesuada sed, efficitur eget tellus. Suspendisse vestibulum, eros
          ac dictum tempor, nulla quam fermentum quam, ut.
        </p>
      </div>
      <div className={styles.aboutEditor}>
        <h2>How to use the editor?</h2>
        <p>
          First things first, we need to build a map on which we can perform our
          pathfinding. Just use the tools on the left side to add or remove
          tiles and create your own map. Alternatively, you can open the
          settings and also check out a prebuild map to get started.
        </p>
        <div
          style={{ backgroundImage: `url(${Zwo})` }}
          className={styles.parallax}
        >
          <h1>Build your own map or just use one of the example maps!</h1>
        </div>

        <p>
          You can begin by placing some cities on the map. There are four
          different type of city tiles. Each type is accessible by different
          means of transportation. The following table show all the
          possibilities for each type.
        </p>
        <table className={styles.aboutEditor__table}>
          <thead>
            <tr>
              <th>Tile</th>
              <th>Type</th>
              <th>Transportation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={CityPreview} alt="" />
              </td>
              <td>City</td>
              <td>Car, Train, Plane, Boat</td>
            </tr>
            <tr>
              <td>
                <img src={TownPreview} alt="" />
              </td>
              <td>Town</td>
              <td>Car, Train, Boat</td>
            </tr>
            <tr>
              <td>
                <img src={VillagePreview} alt="" />
              </td>
              <td>Village</td>
              <td>Car</td>
            </tr>
            <tr>
              <td>
                <img src={SightPreview} alt="" />
              </td>
              <td>Sight</td>
              <td>Car, Boat</td>
            </tr>
          </tbody>
        </table>

        <p>
          Now you can start connecting the different city tiles using the
          matching transport routes. The plane can be used automatically as soon
          as you have placed multiple tiles of type city.
        </p>

        <div className={styles.bla}></div>
      </div>
    </div>
  );
};
