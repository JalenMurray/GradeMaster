import DrawerContent from './DrawerContent';
import SideDrawer from './SideDrawer';

function Layout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <DrawerContent>
        <p>Hi</p>
      </DrawerContent>
      <SideDrawer>
        <p>Hi from the side</p>
      </SideDrawer>
    </div>
  );
}

export default Layout;
