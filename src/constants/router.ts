export const APP_ROUTES = {
  home: '/',

  auth: {
    login: '/login',
    signup: '/sign-up',
    forget_password: '/forget-password',
    reset_password: '/reset-password',
  },

  dashboard: {
    projects: {
      root: '/project',
      add: '/project/add',
    },
    project_Epics: '/project-epics',
    project_Taskes: '/project-tasks',
    project_Members: '/project-members',
    project_details: '/project-details',
  },
};
