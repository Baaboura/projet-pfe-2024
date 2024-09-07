import React, {useEffect, useState} from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiBank, CiDollar, CiHome, CiRepeat, CiSearch, CiSettings, CiViewBoard, CiLogout } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

let menus = [
  { name: "Home", link: `/`, icon: CiHome },
  { name: "Données De Marché", link: `/marche`, icon: CiViewBoard },
  { name: "Données Synchronisées", link: `/donneeSyncronise`, icon: CiRepeat },
  { name: "Espace Entreprise", link: `/FichierEntreprise`, icon: CiBank },
  { name: "Espace Bancaire", link: `/fichierBancaire`, icon: CiDollar },
  { name: "Paramètres", link: `/parametre`, icon: CiSettings },
  { name: "Notifications", link: `/notifications`, icon: IoMdNotificationsOutline },
];

export default function Layout({ children }) {
  const [openSub, setOpenSub] = useState(-1);
  const [email, setEmail] = useState(null);
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
              <div >
                <img src="/assets/img/inetum.png" alt="" className="w-52" />
              </div>
          <div>
            <div className="flex-end">
              {
                email === 'inetum@gmail.com' ?
                  <img src="/assets/img/banque3.png" alt="" className="img-carree" />
                  :
                  <img src="/assets/img/banque4.png" alt="" className="img-carree" />
              }


            </div>

          </div>
        </div>
        <div className="flex-1 p-2">
          {children}
        </div>
      </div>
    </section>
  );
}
