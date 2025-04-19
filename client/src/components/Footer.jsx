"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Github, Mail, Phone } from "lucide-react"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
              ConfidentSpeak
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              AI-powered public speaking enhancement platform to boost your confidence and communication skills.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Navigate</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Practice
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/audio" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Audio Analysis
                </Link>
              </li>
              <li>
                <Link to="/video" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Video Analysis
                </Link>
              </li>
              <li>
                <Link to="/text" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Text Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-400" />
                <a
                  href="mailto:info@confidentspeak.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  info@confidentspeak.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Github size={16} className="text-blue-400" />
                <a
                  href="https://github.com/confidentspeak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; {year} ConfidentSpeak. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
