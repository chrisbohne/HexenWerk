import { DetailSectionProps } from '../../_interfaces';
import Tile from '../../../../assets/images/TileElement.svg';
import styles from './DetailSection.module.scss';
import { Icon } from '../../../../components';
import { getRouteSections } from '../../_utils/canvasHelpers';

export const DetailSection = ({ route }: DetailSectionProps) => {
  const renderVehicle = (type: string) => {
    switch (type) {
      case 'street':
        return <Icon name="car" />;
      case 'rail':
        return <Icon name="train" />;
      case 'shipping':
        return <Icon name="ship" />;
      case 'flight':
        return <Icon name="plane" />;
      default:
        return <div></div>;
    }
  };

  const displayTime = (time: number) => {
    if (time < 60) return `${time}min`;
    else {
      const hours = Math.floor(time / 60);
      const minutes = time - 60 * hours;
      return `${hours}hr ${minutes}min`;
    }
  };

  return (
    <div className={styles.RouteDetails}>
      <div className={styles.RouteDetails__overview}>
        <h3>Total Distance</h3>
        <h4>
          <span>{displayTime(route?.duration)} </span>({route?.distance} x{' '}
          <span>
            <img src={Tile} alt="" />
          </span>
          )
        </h4>
      </div>
      <div className={styles.RouteDetails__details}>
        <h5>Route Sections</h5>
        <ul>
          {getRouteSections(route.path).map((el, index) => {
            return (
              <li key={index}>
                <div>
                  {renderVehicle(el.type)}
                  <span style={{ width: '10px' }}></span>
                  <p>
                    <span>{displayTime(el.duration)} </span>({el.numTiles} x{' '}
                    <span>
                      <img src={Tile} alt="" />
                    </span>
                    )
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
