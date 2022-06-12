import { useState } from 'react';
import { Carousel, Icon } from '../../components';
import styles from './About.module.scss';
import CityTile from '../../assets/images/cities/City.svg';
import TownTile from '../../assets/images/cities/Town.svg';
import VillageTile from '../../assets/images/cities/Village.svg';
import SightTile from '../../assets/images/cities/Sight.svg';
import Example from '../../assets/images/Example.svg';
import StepOne from '../../assets/images/step1.png';
import StepTwo from '../../assets/images/step2.png';
import StepThree from '../../assets/images/step3.png';
import StepFour from '../../assets/images/step4.png';
import StepFive from '../../assets/images/step5.png';
import StepSix from '../../assets/images/step6.png';
import StepSeven from '../../assets/images/step7.png';
import StepEight from '../../assets/images/step8.png';
import StreetPreview from '../../assets/images/StreetPreviewBlue.svg';
import RailPreview from '../../assets/images/RailPreviewBlue.svg';
import CityPreview from '../../assets/images/CityPreviewBlue.svg';
import NaturePreview from '../../assets/images/NaturePreviewBlue.svg';
import Destination from '../../assets/images/DestinationLocation.svg';
import DirectionsClick from '../../assets/images/DirectionsClick1.svg';
import CalculateClick from '../../assets/images/CalculateClick1.svg';
import Tile from '../../assets/images/TileElement.svg';
import Journey from '../../assets/images/Journey.svg';
import { useHandleResize } from '../../hooks';

export const About = () => {
  const [buildIndex, setBuildIndex] = useState(0);
  const [directionsIndex, setDirectionsIndex] = useState(0);
  const windowSize = useHandleResize();

  const getMapBuildSliderText = (index: number) => {
    if (index === 0)
      return `We can start by clicking on the locality category on the
        left side and place some localities on the map. If needed you 
        can click the eraser icon and delete tiles.`;
    if (index === 1)
      return `Next we connect the locations with each other. Note that 
        the locality needs to support the vehicle type to actualy use it 
        for directions.`;
    if (index === 2)
      return `By adding water some localities can also be reached by ship.
        Planes can always fly between cities even if they are not connected.`;
    return `Finally we add more nature tiles to make our map look more like 
      a map. By keeping the space bar pressed you can pan around the map and 
      zoom via mouse wheel.`;
  };

  const getMapDirectionsSliderText = (index: number) => {
    if (index === 0)
      return `After building our own map or using a prebuild map we just open our directions menu.`;
    if (index === 1)
      return `Next we choose our destination and starting point. By clicking the button again we 
        can also change these points again.`;
    if (index === 2)
      return `By using the sliders we change the duration of each vehicle and then calculate the route. 
        Now our route details are visible.`;
    return `By changing the sliders again we can see how our route is recalculated and might change if 
      there is a faster one.`;
  };

  return (
    <>
      {windowSize.width && windowSize.width < 1024 ? (
        <h1>Mobile version comming soon...</h1>
      ) : (
        <div className={styles.about}>
          <div className={styles.aboutHeader}>
            <h1>Programmieren ist kein Hexenwerk.</h1>
          </div>
          <div className={styles.aboutHexFinder}>
            <h2>About</h2>
            <p>
              When something is {'"'}kein Hexenwerk{'"'} Germans mean that it is
              no rocket science. The goal of HexenWerk is exactly to show that
              coding is no rocket science and therefore aims to promote learning
              and disovery of programming and computer science aspects in a
              playful way.
              <br />
              It{"'"}s stil in the early stages, but more content will be added
              in the future. There will be blog posts to different interesting
              topics related to programming and computer science. Furthermore,
              additional pathfinding algorithms will be added to the playground
              and a {"'"}
              Behind the scenes{"'"} section will be introduced. So you can see
              the algorithm in action and fully understand it.
              <br />
              So, stay tuned. &#128640;
            </p>
          </div>

          <div className={styles.aboutEditor}>
            <h1 className={styles.aboutEditor__heading}>
              Disover the playground!
            </h1>
            <div
              style={{ backgroundImage: `url(${Example})` }}
              className={styles.aboutEditor__parallax}
            ></div>
            <div className={styles.aboutEditorInfo}>
              <h2>hexagonal map editor</h2>
              <p>
                The playground is a hexagonal map editor where you can perform
                pathfinding. That means you can build your own map or just use a
                premade one and find the fastest route from point A to point B
                using different vehicles. You can also change different
                parameters and see how the route changes.
                <br /> To calculate the route we use the Dijkstra algorithm and
                convert the data into a weighted map.
              </p>
            </div>
            <div className={styles.aboutEditorBuild}>
              <h1 className={styles.aboutEditorBuild__heading}>
                How to build a map?
              </h1>
              <div className={styles.aboutEditorBuild__tileCategoriesContainer}>
                <h2>Categories</h2>
                <p>
                  There are 4 different categories of tiles we can use to build
                  our map. The street and rail tiles are used for transportation
                  and connect cities with each other. Nature tiles are for
                  decorative purposes. Only the water tile can also be used for
                  shipping. The city tiles are used as locations for our
                  pathfinding. Each one of them can be used as destination or
                  starting point. We can also use them to change our means of
                  transportation.
                </p>
                <ul>
                  <li>
                    <h5>Street</h5>
                    <img src={StreetPreview} alt="" />
                  </li>
                  <li>
                    <h5>Rail</h5>
                    <img src={RailPreview} alt="" />
                  </li>
                  <li>
                    <h5>Locality</h5>
                    <img src={CityPreview} alt="" />
                  </li>
                  <li>
                    <h5>Nature</h5>
                    <img src={NaturePreview} alt="" />
                  </li>
                </ul>
              </div>
              <div className={styles.aboutEditorBuild__cityTilesContainer}>
                <h2>Localities</h2>
                <p>
                  4 different localities can be placed all over the map.
                  However, they all have different transport connections and can
                  be reached differently. The following table show the
                  possibilities of each locality.
                </p>
                <table className={styles.aboutEditorBuild__cityTilesTable}>
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
                        <img src={CityTile} alt="" />
                      </td>
                      <td>City</td>
                      <td>Car, Train, Plane, Boat</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={TownTile} alt="" />
                      </td>
                      <td>Town</td>
                      <td>Car, Train, Boat</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={VillageTile} alt="" />
                      </td>
                      <td>Village</td>
                      <td>Car</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={SightTile} alt="" />
                      </td>
                      <td>Sight</td>
                      <td>Car, Boat</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.aboutEditorBuild__mapExampleContainer}>
                <h2>Example</h2>
                <p>{getMapBuildSliderText(buildIndex)}</p>
                <div className={styles.aboutEditorBuild__mapExampleSlider}>
                  <Carousel
                    setIndex={setBuildIndex}
                    slides={[StepOne, StepTwo, StepThree, StepFour]}
                  />
                </div>
              </div>
            </div>
            <div className={styles.aboutEditorRoute}>
              <h1 className={styles.aboutEditorRoute__heading}>
                How to use directions?
              </h1>
              <div className={styles.aboutEditorRoute__settingsContainer}>
                <h2>Selection</h2>
                <p>
                  Now that we have a map so we can start choosing a starting
                  point and a destination. In addition we can determine how long
                  each means of transportation takes to cover a tile.
                </p>
                <ul>
                  <li>
                    <img src={DirectionsClick} alt="" />
                    {/* <Icon className={styles.sliderIcon} name="slider" /> */}
                    <h5>1. Click slider to open directions menu</h5>
                  </li>
                  <li>
                    <img src={Destination} alt="" />
                    <h5>2. Choose Starting Point and Destination</h5>
                  </li>
                  <li>
                    <div className={styles.sliders}>
                      <input type="range" min="1" max="10" value="4" />
                      <input type="range" min="1" max="10" value="8" />
                      <input type="range" min="1" max="10" value="2" />
                      <input type="range" min="1" max="10" value="6" />
                    </div>
                    <h5>3. Set the duration for each vehicle</h5>
                  </li>
                  <li>
                    <img src={CalculateClick} alt="" />
                    <h5>4. Click calculate to activate route</h5>
                  </li>
                </ul>
              </div>
              <div className={styles.aboutEditorRoute__resultsContainer}>
                <h2>Results</h2>
                <p>
                  Finally we can see how long it takes us to get from one place
                  to the next. In the following example we it would take us 1
                  hour and 43 minutes and our travel distance would be 19 tiles.
                  Also we have to take 4 different means of transportation for
                  the fastes route.
                </p>
                <div className={styles.aboutEditorRoute__results}>
                  <div className={styles.aboutEditorRoute__resultsOverview}>
                    <h3>Total Distance</h3>
                    <h4>
                      <span>1hr 43min </span>(19x{' '}
                      <span>
                        <img src={Tile} alt="" />
                      </span>
                      )
                    </h4>
                  </div>
                  <div className={styles.aboutEditorRoute__resultsDetails}>
                    <h5>Route Sections</h5>
                    <ul>
                      <li>
                        <Icon name="car" />
                        <span style={{ width: '10px' }}></span>
                        <p>
                          <span>25min </span>(5x{' '}
                          <span>
                            <img src={Tile} alt="" />
                          </span>
                          )
                        </p>
                      </li>
                      <li>
                        <Icon name="train" />
                        <span style={{ width: '10px' }}></span>
                        <p>
                          <span>24min </span>(6x{' '}
                          <span>
                            <img src={Tile} alt="" />
                          </span>
                          )
                        </p>
                      </li>
                      <li>
                        <Icon name="plane" />
                        <span style={{ width: '10px' }}></span>
                        <p>
                          <span>30min </span>(5x{' '}
                          <span>
                            <img src={Tile} alt="" />
                          </span>
                          )
                        </p>
                      </li>
                      <li>
                        <Icon name="ship" />
                        <span style={{ width: '10px' }}></span>
                        <p>
                          <span>24min </span>(3x{' '}
                          <span>
                            <img src={Tile} alt="" />
                          </span>
                          )
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.aboutEditorRoute__overviewExplanation}>
                    Total time and tile distance it takes to reach our
                    destination
                  </div>
                  <div className={styles.aboutEditorRoute__detailsExplanation}>
                    List of vehicles to use for each section and their duration
                  </div>
                </div>
              </div>
              <div className={styles.aboutEditorRoute__mapExampleContainer}>
                <h2>Example</h2>
                <p>{getMapDirectionsSliderText(directionsIndex)}</p>
                <div className={styles.aboutEditorBuild__mapExampleSlider}>
                  <Carousel
                    setIndex={setDirectionsIndex}
                    slides={[StepFive, StepSix, StepSeven, StepEight]}
                  />
                </div>
              </div>
            </div>
            <div className={styles.aboutSummary}>
              <div>
                <h1 className={styles.aboutSummary__header}>
                  There is more to come.
                </h1>
                <img src={Journey} alt="" />
                <h3>Reach me at christoph.bohne90@gmail.com</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
