import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        SpeakBetter
      </Link>

      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/record"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Record
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
