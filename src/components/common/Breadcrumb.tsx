import { Link } from 'react-router-dom';
import { Right } from '../../components/icons/Right';

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
            {!isLast && (
              <Right size={5} color="#434654" className="text-neutral-low" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
