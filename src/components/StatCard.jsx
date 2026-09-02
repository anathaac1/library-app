function StatCard({ icon, title, value, description }) {
  return (
    <div className="library-stat-card">

      <div className="library-stat-icon">
        {icon}
      </div>

      <div className="library-stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>

    </div>
  );
}

export default StatCard;