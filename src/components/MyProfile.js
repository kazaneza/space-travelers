import React from 'react';
import { useSelector } from 'react-redux';
import { selectMissions } from '../redux/features/missions/missionSlice';
import styles from '../styles/MyProfile.module.css';

const MyProfile = () => {
  const rockets = useSelector((state) => state.rocket.rockets);
  const missions = useSelector(selectMissions);

  const filterRocketName = () => rockets.filter((rocket) => rocket.reserved);
  const filterMissionByName = () => missions.filter((mission) => mission.reserved);

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.missionList}>
        <h3>My Missions</h3>
        <ul className={styles.listing}>
          {filterMissionByName().map((mission) => (
            <li key={mission.mission_id} className={styles.list}>
              {mission.mission_name}
            </li>
          ))}

        </ul>

      </div>

      <div className={styles.rocketList}>
        <h3>My Rockets</h3>
        <ul className={styles.listing}>
          {filterRocketName().map((rocket) => (
            <li key={rocket.id} className={styles.list}>
              {rocket.rocket_name}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default MyProfile;
