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
    createEpic: (projectId: string) => `/project/${projectId}/epics/new`,
    epics: (projectId: string) => `/project/${projectId}/epics`,
    tasks: (projectId: string) => `/project/${projectId}/tasks`,
    members: (projectId: string) => `/project/${projectId}/members`,
    edit: (projectId: string) => `/project/${projectId}/edit`,
  },
};
