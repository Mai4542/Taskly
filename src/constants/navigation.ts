import container from '../assets/imgs/projectsIcon.svg';
import members from '../assets/imgs/MembersIcon.svg';
import tasks from '../assets/imgs/TasksIcon.svg';
import details from '../assets/imgs/DetailsIcon.svg';
import epics from '../assets/imgs/EpicsIcon.svg';
import { APP_ROUTES } from './router';

export interface NavItem {
  label: string;
  shortLabel: string;
  path: string;
  icon: string;
  end?: boolean;
}

export const getNavItems = (projectId?: string | null): NavItem[] => {
  const items: NavItem[] = [
    {
      label: 'Projects',
      shortLabel: 'Projects',
      path: APP_ROUTES.dashboard.projects.root,
      icon: container,
      end: true,
    },
  ];

  if (projectId) {
    items.push(
      {
        label: 'Project Epics',
        shortLabel: 'Epics',
        path: APP_ROUTES.dashboard.epics(projectId),
        icon: epics,
        end: true,
      },
      {
        label: 'Project Tasks',
        shortLabel: 'Tasks',
        path: APP_ROUTES.dashboard.tasks(projectId),
        icon: tasks,
        end: true,
      },
      {
        label: 'Project Members',
        shortLabel: 'Members',
        path: APP_ROUTES.dashboard.members(projectId),
        icon: members,
        end: true,
      },
      {
        label: 'Project Details',
        shortLabel: 'Details',
        path: APP_ROUTES.dashboard.edit(projectId),
        icon: details,
        end: true,
      },
    );
  }

  return items;
};
