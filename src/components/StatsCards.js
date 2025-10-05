function Stat({ label, value }) {
  return (
    <div className="metric">
      {label}: <strong>{value}</strong>
    </div>
  );
}

function TopUsers({ users }) {
  return (
    <div className="metric">
      Top contributors: <strong>{users.map(u => `${u.user} (${u.labels})`).join(', ')}</strong>
    </div>
  );
}

function StatsCards({ stats }) {
  return (
    <div className="metrics">
      <Stat label="Total candidates" value={stats.num_candidates} />
      <Stat label="Total labels" value={stats.num_labels} />
      <Stat label="Users" value={stats.num_users} />
      <TopUsers users={stats.top_users || []} />
    </div>
  );
}

export default StatsCards;


