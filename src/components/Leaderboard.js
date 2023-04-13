import React, { useState, useEffect } from 'react';
import { database } from '../firebase';


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await database
        .ref('scores')
        .orderByChild('score')
        .limitToLast(10)
        .once('value');

      const data = [];
      snapshot.forEach((childSnapshot) => {
        data.unshift({ ...childSnapshot.val(), key: childSnapshot.key });
      });
      setLeaderboardData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {leaderboardData.map((entry) => (
          <li key={entry.key}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
