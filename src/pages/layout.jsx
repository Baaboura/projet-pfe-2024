import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiBank, CiDollar, CiHome, CiRepeat, CiSearch, CiSettings, CiViewBoard, CiLogout } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

let menus = [
  { name: "Home", link: `/`, icon: CiHome },
  { name: "Recherche", link: `/recherche`, icon: CiSearch },
  { name: "Données De Marché", link: `/marche`, icon: CiViewBoard },
  { name: "Données Synchronisées", link: `/donneeSyncronise`, icon: CiRepeat },
  { name: "Espace Entreprise", link: `/FichierEntreprise`, icon: CiBank },
  { name: "Espace Bancaire", link: `/fichierBancaire`, icon: CiDollar },
  { name: "Paramètres", link: `/parametre`, icon: CiSettings },
  { name: "Notifications", link: `/notifications`, icon: IoMdNotificationsOutline },
];

export default function Layout({ children }) {
  const [openSub, setOpenSub] = useState(-1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openSubMenu = (i) => {
    setOpenSub(i === openSub ? -1 : i);
  };

  const handleLogout = () => {
    // Supprimez le token du stockage local ou de session
    localStorage.clear(); // ou sessionStorage.removeItem('token');
    window.location.href = '/signin';
    // Redirigez l'utilisateur vers la page de connexion
   // navigate('/signin');
  };

  return (
    <section className="flex bg-gray-200">
      <div className={`bg-[#09090b] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="auth-header-logo">
          <Link to={"/"}>
            <img src="/assets/img/logo2.png" alt="" className="auth-header-logo-img" />
          </Link>
        </div>
        <div className="py-3 flex justify-end">
  <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
</div>
<div className="mt-4 flex flex-col gap-1 relative">
  {menus.map((menu, i) => (
    <Link
      to={menu?.link}
      key={i}
      className="p-2 no-underline flex items-center text-sm gap-2 text-white font-medium hover:bg-green-700 rounded-md"
    >
      <div>{React.createElement(menu?.icon, { size: "20" })}</div>
      <h2
        style={{ transitionDelay: `${i + 3}00ms` }}
        className={`whitespace-pre duration-500 text-sm text-white ${
          !open && "opacity-0 translate-x-28 overflow-hidden"
        }`}
      >
        {menu?.name}
      </h2>
    </Link>
  ))}


  {/* Bouton de déconnexion */}
  <button
    onClick={handleLogout}
    className="mt-auto p-2 flex items-center text-sm gap-2 text-white font-medium hover:bg-red-600 rounded-md"
  >
    <div>{React.createElement(CiLogout, { size: "20" })}</div>
    <h2
      style={{ transitionDelay: `100ms` }}
      className={`whitespace-pre duration-500 text-sm text-white ${
        !open && "opacity-0 translate-x-28 overflow-hidden"
      }`}
    >
      Déconnecter
    </h2>
  </button>
</div>

      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-transparent p-3 flex justify-between items-center shadow-md">
          <div className="uppercase font-bold text-xs"></div>
          <div>
            <div className="bg-gray-100 rounded-lg p-2 flex gap-2">
              <svg viewBox="0 0 24 24" className="w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
              <input type="text" className="bg-transparent outline-none text-sm flex-grow" placeholder="search " />
            </div>
          </div>
          <div>
            <img src="/assets/img/profile.avif" className="w-8 rounded-lg" alt="" />
          </div>
        </div>
        <div className="flex-1 p-2">
          {children}
        </div>
      </div>
    </section>
  );
}
