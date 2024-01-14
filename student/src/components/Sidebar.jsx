import React from 'react';
import './sidebar.css';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaThList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle, children }) => {
    const menuItems = [
        // {
        //   path: '/',
        //   name: 'Dashboard',
        //   icon: <FaTh />,
        // },
        {
            path: '/dashboard/student',
            name: 'Student',
            icon: <FaUserAlt />,
        },
        {
            path: '/dashboard/subjects',
            name: 'Subjects',
            icon: <FaCommentAlt />,
        },
        {
            path: '/dashboard/result',
            name: 'Result',
            icon: <FaThList />,
        },
        {
            path: '/dashboard/departments',
            name: 'Department',
            icon: <FaRegChartBar />,
        },
    ];

    return (
        <div className="container">
            <div style={{ width: isOpen ? '200px' : '50px' }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
                        Logo
                    </h1>
                    <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className="link"
                        activeClassName="active"  // This line is causing the warning
                    >
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                            {item.name}
                        </div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
