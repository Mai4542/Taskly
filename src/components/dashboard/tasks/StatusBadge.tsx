import { getStatusBadgeStyle } from '../../../constants/taskStatus';

const StatusBadge = ({ status }: { status?: string }) => {
  const style = getStatusBadgeStyle(status);

  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-[700] uppercase whitespace-nowrap"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
};

export default StatusBadge;
