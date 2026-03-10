import ResourceTableCard from './ResourceTableCard';

const apiHost = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const endpoint = `${apiHost}/api/users/`;

function Users() {
  return (
    <ResourceTableCard
      title="Users"
      endpoint={endpoint}
      columns={[
        {
          label: 'Username',
          render: (item) => item.username || item.name || '-',
        },
        {
          label: 'Email',
          render: (item) => item.email || '-',
        },
        {
          label: 'Team',
          render: (item) => item.team?.name || '-',
        },
      ]}
    />
  );
}

export default Users;
