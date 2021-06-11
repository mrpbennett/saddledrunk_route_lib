import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

// import '../assets/layout.css';

const data = [
  {
    to: '/',
    name: 'home',
    className: 'mr-10 text-white capitalize',
  },
  {
    to: '/route',
    name: 'Routes',
    className: 'text-white capitalize',
  },
];

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <nav className='bg-gray-800'>
          <div className='mx-auto px-2 px-10'>
            <div className='relative flex items-center justify-between h-20'>
              <div className='mr-auto'>
                <span className='text-white font-bold'>SaddleDrunk Route Library</span>
              </div>

              <div className='flex'>
                {data.map((link) => (
                  <Link to={link.to} className={link.className} activeClassName={link.activeClassName}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className='container mx-auto prose flex-grow'>
        <main>{children}</main>
      </div>
      <footer>
        <div className='container mx-auto py-3'>
          <p className='text-xs text-center'>
            Copyright © {new Date().getFullYear()} SaddleDrunk CC <br />
            Intoxicated with the Freedom of Cycling - MMXXI
          </p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;