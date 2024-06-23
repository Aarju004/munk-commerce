import React from "react";
import logo from "/munk_logo.png";

const Navbar = () => {
  return (
    <div className="munk-nav flex items-center h-12 pl-4 gap-4 border-b-2 border-slate-300">
      <img className="h-8 w-8" src={logo} alt="munk-logo" />
      <h3 className=" text-slate-500 text-xl">Monk Upsell & Cross-sell</h3>
    </div>
  );
};

export default Navbar;
