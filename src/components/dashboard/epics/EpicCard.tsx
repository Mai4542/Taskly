import type { Epic } from '../../../types/epic.type';
import { formatDate } from '../../../utils/formatDate';
import { getInitials } from '../../../utils/avatar';

import calendarIcon from '../../../assets/imgs/calender.svg';
import editIcon from '../../../assets/imgs/editicon.svg';

interface EpicCardProps {
  epic: Epic;
  onClick?: (epic: Epic) => void;
}

export default function EpicCard({ epic, onClick }: EpicCardProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      onClick={() => onClick?.(epic)}
      className="relative flex flex-col rounded-lg border border-surface-highest bg-white pl-5 pr-4 py-4 shadow-sm transition-shadow hover:shadow-md cursor-pointer h-50"
    >
      <span className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#004E32]" />

      <div className="flex items-start justify-between">
        <span className=" inline-flex w-fit items-center rounded-sm bg-[#82F9BE] px-2.5 py-1 label-sm text-[12px] font-bold text-[#005235]">
          {epic.epic_id}
        </span>
        <button
          type="button"
          className="text-neutral-low hover:text-neutral-medium"
          aria-label="More options"
          onClick={(e) => e.stopPropagation()}
        >
          ⋮
        </button>
      </div>

      <h3 className="title-md text-[20px] mt-3 text-neutral-high">
        {epic.title}
      </h3>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl title-md bg-[#65DCA4] text-[11px] font-bold text-primary">
          {epic.assignee?.name ? getInitials(epic.assignee.name) : 'NA'}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="label-sm text-[12px]  text-[#434654]">Assignee</span>
          <span className="body-md! text-[14px]  text-[#041B3C]">
            {epic.assignee?.name ?? 'Unassigned'}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-highest pt-3 text-[11px] text-neutral-medium">
        <span className="flex items-center gap-1">
          <img src={editIcon} alt="" className="h-3.5 w-3.5" />
          Created by:{' '}
          <span className="text-neutral-high">
            {epic.created_by?.name ?? '—'}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <img src={calendarIcon} alt="" className="h-3.5 w-3.5" />
          {formatDate(epic.created_at)}
        </span>
      </div>
    </div>
  );
}
