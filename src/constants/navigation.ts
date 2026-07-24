import container from '../assets/imgs/container.png';
import members from '../assets/imgs/people.png';
import tasks from '../assets/imgs/checklist.png';
import details from '../assets/imgs/details.png';
import epics from '../assets/imgs/epics.png';
import { APP_ROUTES } from './router';

export interface NavItem {
  label: string;
  shortLabel: string;
  path: string;
  icon: string;
}

export const getNavItems = (projectId?: string | null): NavItem[] => {
  const items: NavItem[] = [
    {
      label: 'Projects',
      shortLabel: 'Projects',
      path: APP_ROUTES.dashboard.projects.root,
      icon: container,
    },
  ];

  if (projectId) {
    items.push(
      {
        label: 'Project Epics',
        shortLabel: 'Epics',
        path: APP_ROUTES.dashboard.epics(projectId),
        icon: epics,
      },
      {
        label: 'Project Tasks',
        shortLabel: 'Tasks',
        path: APP_ROUTES.dashboard.tasks(projectId),
        icon: tasks,
      },
      {
        label: 'Project Members',
        shortLabel: 'Members',
        path: APP_ROUTES.dashboard.members(projectId),
        icon: members,
      },
      {
        label: 'Project Details',
        shortLabel: 'Details',
        path: APP_ROUTES.dashboard.edit(projectId),
        icon: details,
      },
    );
  }

  return items;
};
