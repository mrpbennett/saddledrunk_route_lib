import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

// import '../assets/layout.css';

const data = [
  {
    to: '/',
    name: 'home',
    className:
      'mr-10 text-white capitalize py-2 px-4 rounded  hover:bg-yellow-200 hover:text-black hover:rounded',
  },
  {
    to: '/route',
    name: 'Routes',
    className: 'text-white capitalize py-2 px-4 rounded hover:bg-yellow-200 hover:text-black hover:rounded',
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
                <Link to='/' className='text-white font-bold hover:text-yellow-200 hidden md:inline'>
                  SaddleDrunk Route Library
                </Link>
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
      <footer className='mt-10'>
        <div className='container mx-auto py-3'>
          <img
            src='https://images.squarespace-cdn.com/content/v1/5bc434afe5f7d17e4e03dd45/1541524382144-ZCB4KX1RFBKV2552QI98/ke17ZwdGBToddI8pDm48kFGbdAAi3Th4NssaNgenDvSoCXeSvxnTEQmG4uwOsdIceAoHiyRoc52GMN5_2H8Wp8A7mP0jgkJI_DnilIhhO0XBcjEMZAMrPDJlp2aVH_LUv2PmWvXrjtdhIg1rUfLrbQ/SD-medium.jpg?format=300w'
            className='block mr-auto ml-auto mb-2 w-12'
          />
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
