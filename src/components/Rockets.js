import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/features/rockets/RocketSlice';
import styles from '../styles/Rocket.module.css';

const RocketsList = () => {
  const rockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <ul className={styles.rocketList}>

      {rockets.map((rocket) => (
        <li key={rocket.rocket_id} className={styles.rocketItem}>
          {rocket.flickr_images.length > 0 && (
            <img src={rocket.flickr_images[0]} alt={rocket.name} className={styles.flickr} />
          )}
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>{rocket.rocket_name}</h3>
            <p className={styles.description}>
              {rocket.description}
            </p>
            <button className={styles.reserve} type="submit">Reserve Rocket</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RocketsList;
