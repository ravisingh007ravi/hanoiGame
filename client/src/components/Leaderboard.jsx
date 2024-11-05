import { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/leaderboard');
      setPlayers(response.data.players);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Leaderboard</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player.email} - {player.steps} steps in {player.time} seconds</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
