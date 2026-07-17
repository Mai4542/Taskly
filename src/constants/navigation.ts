import container from '../assets/imgs/Container.png';
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

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Projects',
    shortLabel: 'Projects',
    path: APP_ROUTES.dashboard.projects,
    icon: container,
  },
  {
    label: 'Project Epics',
    shortLabel: 'Epics',
    path: APP_ROUTES.dashboard.project_Epics,
    icon: epics,
  },
  {
    label: 'Project Tasks',
    shortLabel: 'Tasks',
    path: APP_ROUTES.dashboard.project_Taskes,
    icon: tasks,
  },
  {
    label: 'Project Members',
    shortLabel: 'Members',
    path: APP_ROUTES.dashboard.project_Members,
    icon: members,
  },
  {
    label: 'Project Details',
    shortLabel: 'Details',
    path: APP_ROUTES.dashboard.project_details,
    icon: details,
  },
];
