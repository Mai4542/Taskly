import type { TaskStatus } from '../services/tasks.service';

export const STATUS_COLUMNS = [
  { value: 'TO_DO', label: 'TO DO', dot: '#94A3B8' },
  { value: 'IN_PROGRESS', label: 'IN PROGRESS', dot: '#2563EB' },
  { value: 'BLOCKED', label: 'BLOCKED', dot: '#DC2626' },
  { value: 'IN_REVIEW', label: 'IN REVIEW', dot: '#7C3AED' },
  { value: 'READY_FOR_QA', label: 'READY FOR QA', dot: '#D97706' },
  { value: 'REOPENED', label: 'REOPENED', dot: '#DB2777' },
  {
    value: 'READY_FOR_PRODUCTION',
    label: 'READY FOR PRODUCTION',
    dot: '#059669',
  },
  { value: 'DONE', label: 'DONE', dot: '#16A34A' },
] as const;

export type StatusValue = (typeof STATUS_COLUMNS)[number]['value'];

const STATUS_MAP = Object.fromEntries(
  STATUS_COLUMNS.map((s) => [s.value, s]),
) as Record<TaskStatus, (typeof STATUS_COLUMNS)[number]>;

export const getStatusBadgeStyle = (status?: string) => {
  const config = STATUS_MAP[status as TaskStatus];

  if (!config) {
    return { bg: '#F1F5F9', text: '#475569', label: status ?? '-' };
  }

  return {
    bg: `${config.dot}1A`,
    text: config.dot,
    label: config.label,
  };
};
