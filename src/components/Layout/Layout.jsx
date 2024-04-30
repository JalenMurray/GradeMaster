import DrawerContent from './DrawerContent';
import SideDrawer from './SideDrawer';
import BaseModal from '../BaseModal';
import NewSemesterForm from '../NewSemesterForm';

function Layout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <DrawerContent>
        <p>Hi</p>
        {/*
        Modals Placed Here so they are in center of screen.  Buttons to open are placed elsewhere
        */}
        <BaseModal id="new_semester_modal" otherProps="items-center">
          <NewSemesterForm />
        </BaseModal>
      </DrawerContent>
      <SideDrawer>
        <p>Hi from the side</p>
      </SideDrawer>
    </div>
  );
}

export default Layout;
