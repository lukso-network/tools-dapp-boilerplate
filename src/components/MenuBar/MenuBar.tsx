import Link from 'next/link'
import React from 'react'

/**
 * Provides a top navigation bar including links to all pages.
 *
 * @returns {JSX.Element} - JSX structure of the navigation bar
 */
const MenuBar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link
                href="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span className="font-bold ml-2">LYX Builder</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/components"
              className="py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              Components
            </Link>
            <Link
              href="/contexts"
              className="py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              Contexts
            </Link>
            <Link
              href="/utils"
              className="py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              Utility
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MenuBar
