import { Logo } from '../components/icons/Logo';

const NavBar: React.FC = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center space-x-2">
        <Logo size={18} color="#0052CC" className="h-6 w-5" />
        <h2 className="text-neutral-high text-2xl font-bold font-main">
          TASKLY
        </h2>
      </div>
    </nav>
  );
};
export default NavBar;
