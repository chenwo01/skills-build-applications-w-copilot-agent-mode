import ResourceTableCard from './ResourceTableCard';

const endpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  return (
    <ResourceTableCard
      title="Workouts"
      endpoint={endpoint}
      columns={[
        {
          label: 'Workout',
          render: (item) => item.workout_name || item.name || item.title || '-',
        },
        {
          label: 'Description',
          render: (item) => item.description || '-',
        },
      ]}
    />
  );
}

export default Workouts;
