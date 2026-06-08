function SummaryCard({ label, value, tone }) {
  return (
    <div className="summary-card">
      <div className={`summary-icon ${tone}`} />
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default SummaryCard;
