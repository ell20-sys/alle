import { Link, useLocation } from "@remix-run/react";
import { MdMail } from "react-icons/md";
import { BiQuestionMark } from "react-icons/bi";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-between font-semibold">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/alle-log.png" alt="Logo" className="h-10" />
          <span className="text-2xl font-semibold font-borel">alle</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/faq"
                className={`hover:bg-blue-100 px-5 py-3 rounded-full transition-colors duration-300 ease-in-out relative ${
                  isActive("/faq") ? "bg-blue-200" : ""
                }`}
              >
                <span>FAQ</span>
                <span className="absolute top-2 right-0 text-blue-600 -rotate-180 font-bold">
                  <BiQuestionMark className="w-6 h-6" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/fanmail"
                className={`hover:bg-blue-100 px-5 py-3 rounded-full transition-colors duration-300 ease-in-out relative ${
                  isActive("/fanmail") ? "bg-blue-200" : ""
                }`}
              >
                <span>Fan mail</span>
                <span className="absolute top-3 right-1 text-blue-600 -rotate-45">
                  <MdMail className="w-4 h-4" />
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
