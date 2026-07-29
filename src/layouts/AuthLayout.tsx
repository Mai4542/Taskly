import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className=" flex flex-1 items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}