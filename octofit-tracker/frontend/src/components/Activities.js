import ResourceTableCard from './ResourceTableCard';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  return (
    <ResourceTableCard
      title="Activities"
      endpoint={endpoint}
      columns={[
        {
          label: 'Activities',
          render: (item) => item.type || '-',
        },
        {
          label: 'Duration',
          render: (item) => item.duration || item.minutes || '-',
        },
        {
          label: 'User',
          render: (item) => item.user?.name || item.user?.email || item.username || '-',
        },
      ]}
    />
  );
}

export default Activities;
