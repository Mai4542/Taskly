import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
export default function AuthLayout() {
  return (
    <div className="min-h-screen pb-19 bg-background">
      <NavBar />
      <Outlet />
    </div>
  );
}
