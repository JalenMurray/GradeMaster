import Logo from '../../assets/logo.png';
import Menu from './Menu';

function SideDrawer() {
  return (
    <div className="drawer-side z-40 border-r-2 border-neutral">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
      <aside className="min-h-screen w-80">
        <div className="sticky top-0 z-20 mb-4">
          <a href="/" className="btn btn-ghost px-2">
            <img className="w-10 h-10 rounded-2xl" alt="GradeMasterLogo" src={Logo} />
            <div className="font-title inline-flex text-lg md:text-2xl">GradeMaster</div>
          </a>
        </div>
        <Menu />
      </aside>
    </div>
  );
}

export default SideDrawer;
