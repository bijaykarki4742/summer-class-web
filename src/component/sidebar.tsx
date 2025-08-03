import { FaRegSun, FaRegStar, FaUser, FaRegListAlt, FaRegCheckCircle, FaUserCheck } from 'react-icons/fa';
import { MdSearch } from 'react-icons/md';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white h-screen p-6 flex flex-col border-r border-gray-200">
      {/* Logo and App Name */}
      <div className="flex items-center mb-8">
        <FaRegSun className="text-blue-500 text-2xl mr-2" />
        <span className="text-xl font-bold tracking-wide">MY TODO</span>
      </div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
      </div>
      {/* Favorites Section */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 font-semibold mb-2">Favorites</div>
        <ul className="space-y-1">
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaRegSun className="text-blue-500" /> My Day
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">8</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaRegStar className="text-blue-500" /> Important
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">1</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaUser className="text-blue-500" /> Personal
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">4</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaRegListAlt className="text-blue-500" /> All
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">56</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaRegCheckCircle className="text-blue-500" /> Completed
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">10</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <FaUserCheck className="text-blue-500" /> Assigned to me
            </span>
          </li>
        </ul>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />
      {/* Your own tags Section */}
      <div>
        <div className="text-xs text-gray-500 font-semibold mb-2">Your own tags</div>
        <ul className="space-y-1">
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> GoPay
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">4</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> Kretya Studio
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">2</span>
          </li>
          <li className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <span className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> Content Dump
            </span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">21</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
