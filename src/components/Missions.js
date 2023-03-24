import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMissions, selectMissions } from '../features/missions/missionSlice';

const Missions = () => {
  const dispatch = useDispatch();
  const missions = useSelector(selectMissions);

  useEffect(() => {
    const fetchMissions = async () => {
      const response = await fetch('https://api.spacexdata.com/v3/missions');
      const data = await response.json();
      dispatch(setMissions(data));
    };

    if (missions.length === 0) {
      fetchMissions();
    }
  }, [missions, dispatch]);

  return (
    <div>
      <h1>Missions</h1>
      {missions.map((mission) => (
        <div key={mission.mission_id}>
          <h2>{mission.mission_name}</h2>
          <p>{mission.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Missions;
