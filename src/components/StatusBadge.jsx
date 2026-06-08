import { getStatusLabel } from '../utils/formatters.js';

function getBadgeClass(status) {
  const value = String(status || '').toLowerCase();

  if (value.includes('pending')) return 'status-badge status-pending';
  if (value.includes('complete') || value.includes('delivered')) return 'status-badge status-completed';
  if (value.includes('transit') || value.includes('delivery')) return 'status-badge status-transit';

  return 'status-badge status-default';
}

function StatusBadge({ status }) {
  return <span className={getBadgeClass(status)}>{getStatusLabel(status) || 'Unknown'}</span>;
}

export default StatusBadge;
