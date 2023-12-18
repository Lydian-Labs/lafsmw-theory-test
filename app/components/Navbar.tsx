"use client";

import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="text-center sm:flex left-0 top-0 w-full z-[3] ease-in duration-300 text-black">
      <div className="flex p-4 justify-between">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl">Vexflow Projects</h1>
        </Link>
      </div>

      <ul className="hidden sm:text-1xl py-20 sm:py-1 sm:flex">
        <li className="p-4">
          <Link href="/renderNotes">Render Notes</Link>
        </li>
        <li className="p-4">
          <Link href="/addNotesToStaff">Add Notes to a Staff</Link>
        </li>
        <li className="p-4">
          <Link href="/addAccidentalsToNotes">Add Accidentals</Link>
        </li>
        <li className="p-4">
          <Link href="/ExamSample">Exam Sample</Link>
        </li>
        <li className="p-4">
          <Link href="/typeScriptPractice">Typescript Practice</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
