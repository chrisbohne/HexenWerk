import { Button, Divider, Icon } from '../../../../components';
import { RouteSectionProps } from '../../_interfaces';
import { DetailSection } from '../DetailSection/DetailSection';
import styles from './RouteSection.module.scss';

export const RouteSection = ({
  calculateRoute,
  showRouteUpdate,
  handleRouteCancel,
  route,
}: RouteSectionProps) => {
  return (
    <>
      <div className={styles.routeSection}>
        <div className={styles.routeSection__heading}>
          <h3>Route</h3>
          <p>Calculate the route to find the fastest option</p>
        </div>
        <div className={styles.routeSection__content}>
          <Button
            type="menu"
            onClick={calculateRoute}
            className={`${styles.routeSection__button} ${
              showRouteUpdate && styles['routeSection__button-selected']
            }`}
          >
            Calculate
            {showRouteUpdate ? (
              <Icon name="checkSquare" />
            ) : (
              <Icon name="square" />
            )}
          </Button>
          {showRouteUpdate && (
            <Icon
              name="cancel"
              className={styles.routeSection__cancel}
              onClick={handleRouteCancel}
            />
          )}
        </div>
      </div>

      {/* {route?.duration && (
        <>
          <Divider>
            <Icon name="route" />
          </Divider>{' '}
          <DetailSection route={route} />{' '}
        </>
      )} */}
    </>
  );
};
