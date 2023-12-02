"use client";

import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState, FC } from "react";

const Navbar: FC = () => {
  const [nav, setNav] = useState<boolean>(false);

  function handleNav() {
    setNav(!nav);
  }

  return (
    <div className="text-center sm:flex fixed left-0 top-0 w-full z-[3] ease-in duration-300 text-black">
      <div className="flex p-4 justify-between">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl">Vexflow Projects</h1>
        </Link>
        {/* <div className="sm:hidden">
          <AiOutlineMenu size={25} />
        </div> */}
      </div>

      <ul className="hidden sm:text-1xl py-20 sm:py-1 sm:flex">
        <li className="p-4">
          <Link href="/renderNotes">Render Notes</Link>
        </li>
        <li className="p-4">
          <Link href="/addNotesToStaff">Add Notes to a Staff</Link>
        </li>
        {/* <li className="p-4">
          <Link href="/addAudioToNotes">Add Audio to Notes</Link>
        </li> */}
        <li className="p-4">
          <Link href="/addAccidentalsToNotes">Add Accidentals</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
