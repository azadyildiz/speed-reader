'use client';

import { useState } from 'react';
import Link from 'next/link';

import Logo from '../../Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-light-color drop-shadow-sm">
        <nav className=" mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8" aria-label="Global">
          <div id="headerLeftSide" className="flex items-center">
            <div id="headerLogo" className="flex items-center mr-10">
              <Link href="/">
                <Logo className={'text-brand-color'} />
              </Link>
            </div>
            <div id="headerLinks" className="hidden md:flex md:gap-x-12">
              <Link className="text-sm font-semibold leading-6 text-gray-900 hover:opacity-80" href="/about">
                About
              </Link>
              <Link className="text-sm font-semibold leading-6 text-gray-900 hover:opacity-80" href="/pricing">
                Pricing
              </Link>
              <Link className="text-sm font-semibold leading-6 text-gray-900 hover:opacity-80" href="/try-demo">
                Try Demo
              </Link>
            </div>
          </div>
          <div id="headerRightSide" className="hidden md:flex md:justify-end">
            <Link className="text-sm font-semibold leading-6 text-light-color bg-dark-color hover:opacity-80 transition-opacity duration-200 px-4 py-2 rounded" href="/register">
              Get Started
            </Link>
          </div>
          <div id="headerMobileMenuButton" className="flex md:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-gray-900">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </nav>
      </header>
      <div id="headerMobileMenu" className="md:hidden">
        <div className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black/50 backdrop-blur-sm flex justify-end md:max-w-sm md:ring-1 md:ring-gray-900/10 ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className=" w-[min(20rem,calc(100vw-theme(spacing.10)))] bg-light-color p-6">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Logo className={'text-brand-color'}></Logo>
              </Link>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-gray-900">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link onClick={()=> setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100" href="/about">
                    About
                  </Link>
                  <Link onClick={()=> setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100" href="/pricing">
                    Pricing
                  </Link>
                  <Link onClick={()=> setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100" href="/try-demo">
                    Try Demo
                  </Link>
                </div>
                <div className="py-6">
                  <Link onClick={()=> setMobileMenuOpen(false)} className="text-sm font-semibold leading-6 text-light-color bg-dark-color hover:opacity-80 transition-opacity duration-200 px-4 py-2 rounded" href="/register">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
