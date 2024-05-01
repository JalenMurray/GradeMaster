import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import BaseModal from '../BaseModal';
import NewSemesterForm from '../Forms/NewSemesterForm';
import Account from '../Routes/Account';
import Home from '../Routes/Home';
import NewClassForm from '../Forms/NewClassForm';
import Semester from '../Routes/Semester';

function DrawerContent() {
  return (
    <div className="drawer-content ml-4 max-w-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/semester/:semesterId" element={<Semester />} />
      </Routes>
      {/*
        Modals Placed Here so they are in center of screen.  Buttons to open are placed elsewhere
        */}
      <BaseModal id="new_semester_modal" otherProps="items-center">
        <NewSemesterForm />
      </BaseModal>
      <BaseModal id="new_class_modal" otherProps="items-center max-w-3xl">
        <NewClassForm />
      </BaseModal>
    </div>
  );
}

export default DrawerContent;
