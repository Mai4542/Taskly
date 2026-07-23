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
const ForgotPassword = lazy(() => import('../pages/auth/ForgetPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))
const Project = lazy(() => import('../pages/dashboardPages/Projects'));
const ProjectEpics = lazy(() => import('../pages/dashboardPages/ProjectEpics'));
const ProjectMembers = lazy(
  () => import('../pages/dashboardPages/ProjectMembers'),
);
const ProjectTasks = lazy(() => import('../pages/dashboardPages/ProjectTasks'));
const ProjectDetails = lazy(
  () => import('../pages/dashboardPages/ProjectsDetails'),
);
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
        element: <Navigate to={APP_ROUTES.dashboard.projects} replace />,
      },
      {
        path: APP_ROUTES.dashboard.projects,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Project />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.project_Epics,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectEpics />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.project_details,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectDetails />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.project_Members,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectMembers />
          </Suspense>
        ),
      },
      {
        path: APP_ROUTES.dashboard.project_Taskes,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectTasks />
          </Suspense>
        ),
      },
    ],
  },
]);
export default router;
