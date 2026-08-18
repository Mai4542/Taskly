import { createBrowserRouter, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../constants/router';
import { lazy, Suspense } from 'react';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';

const Home = lazy(() => import('../pages/Home'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const SignUp = lazy(() => import('../pages/auth/SignUp'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));
const Project = lazy(() => import('../pages/dashboard/Projects'));
const AddProject = lazy(() => import('../pages/dashboard/AddProject'));
const ProjectEpics = lazy(() => import('../pages/dashboard/ProjectEpics'));
const ProjectMembers = lazy(() => import('../pages/dashboard/ProjectMembers'));
const ProjectTasks = lazy(() => import('../pages/dashboard/ProjectTasks'));
const EditProject = lazy(() => import('../pages/dashboard/EditProject'));
const CreateEpic = lazy(() => import('../pages/dashboard/CreateEpic'));
const AddTask = lazy(() => import('../pages/dashboard/AddTask'));
const AcceptInvitation = lazy(() => import('../pages/AcceptInvitation'));

const router = createBrowserRouter([
  {
    path: APP_ROUTES.home,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: APP_ROUTES.invite,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <AcceptInvitation />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      </Suspense>
    ),
    children: [
      {
        path: APP_ROUTES.auth.signup,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.auth.login,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.auth.forget_password,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.auth.reset_password,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={APP_ROUTES.dashboard.projects.root} replace />,
      },
      {
        path: APP_ROUTES.dashboard.projects.root,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Project />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.projects.add,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddProject />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.createEpic(':projectId'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreateEpic />
          </Suspense>
        ),
      },
      {
        path: '/project/:projectId/epics',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectEpics />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.createTask(':projectId'),
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddTask />
          </Suspense>
        ),
      },
      {
        path: '/project/:projectId/tasks',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectTasks />
          </Suspense>
        ),
      },
      {
        path: '/project/:projectId/members',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectMembers />
          </Suspense>
        ),
      },
      {
        path: '/project/:projectId/edit',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditProject />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
