import ResourceTableCard from './ResourceTableCard';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  return (
    <ResourceTableCard
      title="Teams"
      endpoint={endpoint}
      columns={[
        {
          label: 'Team Name',
          render: (item) => item.team_name || item.name || '-',
        },
        {
          label: 'Members',
          render: (item) => {
            if (item.members && Array.isArray(item.members) && item.members.length > 0) {
              return item.members.map(m => m.name).join(', ');
            }
            return '-';
          },
        },
      ]}
    />
  );
}

export default Teams;
