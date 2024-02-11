import React, { useState } from 'react'
import './Admin.scss';
import ApproveHostel from './ApproveHostel';
import { ManageUser } from './ManageUser';
export const Admin = () => {

  const [isEditSectionVisible, setEditSectionVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('approve-hostel');

  const switchSection = (section) => {
    setActiveSection(section);
  }

  return (
    <>
      <div className='admin'>
        <div className='admin-dashboard'>
          <div className='admin-logo'>
            <i class="fa-solid fa-user-tie"></i>
            <p>Admin</p>
          </div>
          <div className='dashboard-link'>
            <div className={`approve-hostel ${activeSection === 'approve-hostel' ? 'active' : ''}`} onClick={() => switchSection('approve-hostel')}>
              <i class="fa-solid fa-bed"></i>Approve Hostel
            </div>
            <div className={`manage-user ${activeSection === 'manage-user' ? 'active' : ''}`} onClick={() => switchSection('manage-user')}>
              <i class="fa-solid fa-user"></i>Manage User
            </div>
          </div>
        </div>
        <div className='dashboard-section'>
          {activeSection === 'manage-user' && (
            <ManageUser />
          )}
          {activeSection === 'approve-hostel' && (
            <ApproveHostel />
          )}
        </div>
      </div>
    </>
  )
}

export default Admin;
