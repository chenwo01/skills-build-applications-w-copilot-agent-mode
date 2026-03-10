import ResourceTableCard from './ResourceTableCard';

const apiHost = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const endpoint = `${apiHost}/api/leaderboard/`;

function Leaderboard() {
  return (
    <ResourceTableCard
      title="Leaderboard"
      endpoint={endpoint}
      sortItems={(a, b) => Number(b.points || b.score || 0) - Number(a.points || a.score || 0)}
      columns={[
        {
          label: 'Name',
          render: (item) => item.team?.name || item.team_name || item.name || '-',
        },
        {
          label: 'Points',
          render: (item) => item.points || item.score || '-',
        },
      ]}
    />
  );
}

export default Leaderboard;
