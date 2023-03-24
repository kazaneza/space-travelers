import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchMissions, selectMissions, selectMissionsStatus } from '../features/missions/missionSlice';

const Missions = () => {
  const missions = useSelector(selectMissions);
  const missionsStatus = useSelector(selectMissionsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  return (
    <div>
      {missionsStatus === 'loading' ? (
        <p>Loading missions...</p>
      ) : missionsStatus === 'failed' ? (
        <p>
          Failed to load missions:
          {missions.error}
        </p>
      ) : (
        <>
          <h2>Missions</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.mission_id}>
                  <td>{mission.mission_name}</td>
                  <td>{mission.description}</td>
                  <td>{mission.upcoming ? 'Upcoming' : 'Past'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Missions;
