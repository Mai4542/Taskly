import { ProjectsIcon } from '../components/icons/ProjectsIcon';
import { MembersIcon } from '../components/icons/MembersIcon';
import { TasksIcon } from '../components/icons/TasksIcon';
import { DetailsIcon } from '../components/icons/DetailsIcon';
import { EpicsIcon } from '../components/icons/EpicsIcon';
import { APP_ROUTES } from './router';

export interface NavItem {
  label: string;
  shortLabel: string;
  path: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  end?: boolean;
}

export const getNavItems = (projectId?: string | null): NavItem[] => {
  const items: NavItem[] = [
    {
      label: 'Projects',
      shortLabel: 'Projects',
      path: APP_ROUTES.dashboard.projects.root,
      icon: ProjectsIcon,
      end: true,
    },
  ];

  if (projectId) {
    items.push(
      {
        label: 'Project Epics',
        shortLabel: 'Epics',
        path: APP_ROUTES.dashboard.epics(projectId),
        icon: EpicsIcon,
        end: true,
      },
      {
        label: 'Project Tasks',
        shortLabel: 'Tasks',
        path: APP_ROUTES.dashboard.tasks(projectId),
        icon: TasksIcon,
        end: true,
      },
      {
        label: 'Project Members',
        shortLabel: 'Members',
        path: APP_ROUTES.dashboard.members(projectId),
        icon: MembersIcon,
        end: true,
      },
      {
        label: 'Project Details',
        shortLabel: 'Details',
        path: APP_ROUTES.dashboard.edit(projectId),
        icon: DetailsIcon,
        end: true,
      },
    );
  }

  return items;
};
