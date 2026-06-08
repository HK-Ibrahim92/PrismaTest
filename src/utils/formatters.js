export function formatText(value) {
  if (value === null || value === undefined || value === '') return '-';

  return String(value)
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatDate(value) {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return formatText(value);

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function getStatusLabel(status) {
  return formatText(status);
}

export function getField(item, fields) {
  const field = fields.find((key) => item?.[key] !== undefined && item?.[key] !== null);
  return field ? item[field] : '';
}
