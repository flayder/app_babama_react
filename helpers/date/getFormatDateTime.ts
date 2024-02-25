export function getFormatDateTime(date: string | number): string {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(date)).replace(/,/, '');
}
