import { Link } from "@remix-run/react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className=" text-gray-600 p-8 flex justify-evenly items-center w-full">
      <p>&copy; alle by <a href="https://github.com/ell20-sys" className="hover:text-blue-600">elliotawe</a></p>
      <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/about"
                className="px-5 py-3"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="px-5 py-3"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="px-5 py-3"
              >
                Terms
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
      <ul className="flex space-x-6">
        <li>
          <a
            href="https://x.com/elliot_awe" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 flex items-center justify-center"
          >
            <FaXTwitter size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/elliot-awe"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 flex items-center justify-center"
          >
            <FaLinkedin size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ell20-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 flex items-center justify-center"
          >
            <FaGithub size={24} />
          </a>
        </li>
      </ul>
    </nav>
    </footer>
  );
}
