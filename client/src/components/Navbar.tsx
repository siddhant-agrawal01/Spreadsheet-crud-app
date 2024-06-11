import React from "react";

const Navbar = () => {
  return (
    <nav className=" border-green-200 bg-green-500">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../public/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SpreadSheet Crud-App
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
