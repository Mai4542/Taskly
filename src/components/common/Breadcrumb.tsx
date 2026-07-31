import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 mb-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="label-sm text-[11px] tracking-wide text-neutral-medium hover:text-primary uppercase"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`label-sm text-[11px] tracking-wide uppercase ${
                  isLast ? 'text-primary-container' : 'text-neutral-medium'
                }`}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="text-neutral-low text-[11px]">›</span>}
          </div>
        );
      })}
    </nav>
  );
}
