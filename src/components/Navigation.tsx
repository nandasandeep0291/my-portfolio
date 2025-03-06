import { FC, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navigation: FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Sandeep Nanda
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Blog', 'Projects', 'Contact'].map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page.toLowerCase())}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  activePage === page.toLowerCase()
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Home', 'About', 'Blog', 'Projects', 'Contact'].map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page.toLowerCase())}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === page.toLowerCase()
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
