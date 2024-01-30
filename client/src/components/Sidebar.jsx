import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser} from "react-icons/ai";
import { Link } from "react-router-dom";

import dgiLogo from '../assets/dgi-clinics.png';
import { FaBoxes, FaChevronDown, FaChevronRight, FaMoneyBill, FaUserInjured, FaUsers, FaVial, FaVials } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";
import { FaSnowflake } from "react-icons/fa";

function Sidebar() {
    const menus = [
        { name: "dashboard", link: "dashboard", icon: MdOutlineDashboard },
        { name: "user", link: "users/:id", icon: AiOutlineUser },
        { name: "Activities", link: "activities", icon: FaUsers },
        { name: "Attendance", link: "attendance", icon: FaUsers },
        { name: "Clients", link: "clients", icon: FaUserInjured, margin: true },
        { name: "Test Category", link: "labcategory", icon: FaVials },
        { name: "Inventory Mangement",link: "/", icon: FaBoxes, dropdown: true, 
        subMenu: [
          {name: "Inventory Mangement", link: "/",},
          {name: "Inventory Mangement", link: "/",}
        ] },
        { name: "Client Billing System", link: "/", icon: FaMoneyBill, dropdown: true,
        subMenu: [
          {name: "Client Billing", link: "/",},
          {name: "Client Billing", link: "/",}
        ] ,
         margin: true },
        { name: "Pathology", link: "/upt", icon: FaVial},
        { name: "Radiology", link: "/", icon: FaSnowflake },
        { name: "Report Booth", link: "/", icon: FaThermometerHalf },
        { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
      ];

      const [open, setOpen] = useState(true);
      const [largeScreen, setLargeScreen] = useState(window.innerWidth > 780);
      const [openSubMenu, setOpenSubMenu] = useState("");

      useEffect(() => {
        const handleResize = () => {
            setLargeScreen(window.innerWidth > 780);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
       }, []);

       useEffect(() => {
        if (!largeScreen) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [largeScreen]);

      const handleSubMenuClick = (menuName) => {
        if (menuName === openSubMenu) {
          setOpenSubMenu("");
        } else {
          setOpenSubMenu(menuName);
        }
      };
      
  return (
      <section className="h-screen flex gap-4 transition-all duration-300">
         <div className={`bg-[#01AC9C] ${open ? "w-66" : "w-16"} text-gray-100 px-4 duration-300 `}>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)}/>
          </div>

          <div className="w-full flex items-center justify-center "><img className="cursor-pointer w-36" src={dgiLogo} /></div>

          <div className="mt-4 mb-auto flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <div key={i} className="group flex flex-col items-start text-sm font-medium p-2 hover:bg-[#F8981D] rounded-md relative">
          <Link to={menu.link}>
            <div onClick={() => handleSubMenuClick(menu.name)} className="group flex items-center w-full h-auto scroll-behavior-smooth mb-auto cursor-pointer">
                <div className="mr-4">{React.createElement(menu.icon, { size: "20" })}</div>
                <h2 style={{ transitionDelay: `${i + 3}00ms`, }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                  {menu.name}
                </h2>
                {menu.dropdown && (openSubMenu === menu.name ? <FaChevronDown /> : <FaChevronRight />)}
            </div>   

          </Link>
          
            {menu.dropdown && openSubMenu === menu.name && (
              <div className="pl-6 flex flex-col transition-height duration-700 ease-in-out" style={{ height: openSubMenu === menu.name ? 'auto' : '0' }}>
                {menu.subMenu.map((subMenu, j) => (
                  <Link key={j} to={subMenu.link} className="group flex items-center text-sm font-medium px-2 py-1 hover:bg-gray-800 rounded-md">
                    <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                      {subMenu.name}
                    </h2>
                  </Link>
                ))}
             </div>
             )}
           </div>
         ))}

        </div>  
     </div>
  </section> 
  )
}

export default Sidebar

