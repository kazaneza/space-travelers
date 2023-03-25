import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, reserveRocket, cancelRocket } from '../redux/features/rockets/RocketSlice';
import styles from '../styles/Rocket.module.css';

const RocketsList = () => {
  const rockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleReserveClick = (id) => {
    dispatch(reserveRocket(id));
    const reservedRockets = JSON.parse(localStorage.getItem('reservedRockets')) || [];
    localStorage.setItem('reservedRockets', JSON.stringify([...reservedRockets, id]));
  };

  const handleCancelClick = (id) => {
    dispatch(cancelRocket(id));
    const reservedRockets = JSON.parse(localStorage.getItem('reservedRockets')) || [];
    localStorage.setItem('reservedRockets', JSON.stringify(reservedRockets.filter((rocketId) => rocketId !== id)));
  };

  const reservedRockets = JSON.parse(localStorage.getItem('reservedRockets')) || [];

  const reservedRocketIds = new Set(reservedRockets);

  return (
    <ul className={styles.rocketList}>
      {rockets.map((rocket) => (
        <li key={rocket.id} className={styles.rocketItem}>
          {rocket.flickr_images.length > 0 && (
            <img src={rocket.flickr_images[0]} alt={rocket.name} className={styles.flickr} />
          )}
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>{rocket.rocket_name}</h3>
            <div className={styles.description}>
              {reservedRocketIds.has(rocket.id) && (<span className={styles.reserved}>Reserved</span>)}
              <span>{rocket.description}</span>
            </div>
            {reservedRocketIds.has(rocket.id)
              ? (
                <div>
                  <button className={styles.cancel} type="button" onClick={() => handleCancelClick(rocket.id)}>Cancel Reservation</button>
                </div>
              )
              : (
                <div>
                  <button
                    className={styles.reserve}
                    type="button"
                    onClick={() => handleReserveClick(rocket.id)}
                  >
                    Reserve Rocket
                  </button>
                </div>
              )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RocketsList;
