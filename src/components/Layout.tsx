import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Layers, Clock, Box, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.dashboard'), icon: Home },
    { to: '/phases', label: t('nav.phases'), icon: Layers },
    { to: '/sessions', label: t('nav.sessions'), icon: Clock },
    { to: '/architecture', label: t('nav.architecture'), icon: Box },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Easy Return - Gauche */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Easy Return</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Project Dashboard</p>
              </div>
            </div>

            {/* Navigation Centre */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
              <ThemeToggle />
              <LanguageSwitcher />

              {/* Burger Menu Button - Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo SynTech - Droite */}
            <div className="flex-shrink-0 hidden md:block">
              <img
                src={`${import.meta.env.BASE_URL}syntech-full.svg`}
                alt="SynTech Studios"
                className="h-20 w-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Logo and Close Button */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                      <Box className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Easy Return</h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Project Dashboard</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Settings Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-4">Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Theme</span>
                      <ThemeToggle />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Language</span>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <img
                    src={`${import.meta.env.BASE_URL}syntech-full.svg`}
                    alt="SynTech Studios"
                    className="h-16 w-auto mx-auto"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}syntech-full.svg`}
              alt="SynTech Studios"
              className="h-16 w-auto"
            />
            <div className="text-base text-gray-600 dark:text-gray-400 font-medium">
              © 2026 SynTech Studios
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
