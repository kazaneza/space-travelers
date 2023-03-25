import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import {
  fetchMissions, selectMissions, selectMissionsStatus, reserveMission, cancelMissionReservation,
} from '../redux/features/missions/missionSlice';

const Missions = () => {
  const missions = useSelector(selectMissions);
  const missionsStatus = useSelector(selectMissionsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions]);

  const handleMissionReserve = (id) => {
    dispatch(reserveMission(id));
  };

  const handleMissionCancel = (id) => {
    dispatch(cancelMissionReservation(id));
  };

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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mission</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission.mission_id}>
                  <td>{mission.mission_name}</td>
                  <td>{mission.description}</td>
                  <td>{mission.reserved ? 'Active member' : 'Not a member'}</td>
                  <td>
                    {mission.reserved ? (
                      <div>
                        <button className="btn btn-danger" type="button" onClick={() => handleMissionCancel(mission.mission_id)}>
                          Leave Mission
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-primary" type="button" onClick={() => handleMissionReserve(mission.mission_id)}>
                        Join Mission
                      </button>
                    )}
                  </td>
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
