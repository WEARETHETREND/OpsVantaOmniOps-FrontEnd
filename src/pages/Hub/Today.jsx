import React from 'react';
import { useQuery } from 'react-query';
import AlertCard from './AlertCard';
import MoveCard from './MoveCard';
import LogCard from './LogCard';

const fetchAlerts = async () => {
  // Replace this URL with your actual API endpoint to fetch alerts
  const response = await fetch('/api/alerts');
  return response.json();
};

const fetchRecommendedMoves = async () => {
  // Replace this URL with your actual API endpoint to fetch recommended moves
  const response = await fetch('/api/recommended-moves');
  return response.json();
};

const fetchAutopilotLog = async () => {
  // Replace this URL with your actual API endpoint to fetch autopilot logs
  const response = await fetch('/api/autopilot-log?last=24h');
  return response.json();
};

const Today = () => {
  const { data: alerts, isLoading: alertsLoading } = useQuery('alerts', fetchAlerts, { refetchInterval: 30000 });
  const { data: recommendedMoves, isLoading: movesLoading } = useQuery('recommendedMoves', fetchRecommendedMoves, { refetchInterval: 30000 });
  const { data: autopilotLog, isLoading: logLoading } = useQuery('autopilotLog', fetchAutopilotLog, { refetchInterval: 30000 });

  if (alertsLoading || movesLoading || logLoading) return <div>Loading...</div>;

  if (!alerts.length) return <div>No alerts available.</div>;
  if (!recommendedMoves.length) return <div>No recommended moves available.</div>;
  if (!autopilotLog.length) return <div>No autopilot logs available for the last 24 hours.</div>;

  return (
    <div>
      <h1>Today&apos;s Overview</h1>
      <section>
        <h2>Top Alerts</h2>
        {alerts.slice(0, 3).map(alert => (<AlertCard key={alert.id} alert={alert} />))}
      </section>
      <section>
        <h2>Top Recommended Moves</h2>
        {recommendedMoves.slice(0, 3).map(move => (<MoveCard key={move.id} move={move} />))}
      </section>
      <section>
        <h2>Last 24h Autopilot Log</h2>
        {autopilotLog.map(log => (<LogCard key={log.id} log={log} />))}
      </section>
    </div>
  );
};

export default Today;