import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BaseModal from '../BaseModal';
import NewSemesterForm from '../NewSemesterForm';
import Account from '../Routes/Account';
import Home from '../Routes/Home';

function DrawerContent() {
  return (
    <div className="drawer-content ml-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      {/*
        Modals Placed Here so they are in center of screen.  Buttons to open are placed elsewhere
        */}
      <BaseModal id="new_semester_modal" otherProps="items-center">
        <NewSemesterForm />
      </BaseModal>
    </div>
  );
}

export default DrawerContent;
