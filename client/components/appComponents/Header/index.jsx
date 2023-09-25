'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '../../Logo';

export default function Header() {
  const router = useRouter()
  function handleLogout() {
    router.push('/')
  }
  return (
    <>
      <header className="bg-light-color drop-shadow-sm dark:bg-dark-color">
        <nav className=" mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8" aria-label="Global">
          <div id="headerLeftSide" className="flex items-center">
            <div id="headerLogo" className="flex items-center mr-2">
              <Link href="/">
                <Logo className={'text-brand-color'} />
              </Link>
            </div>
            <div id="headerLinks" className="hidden md:flex md:gap-x-12">
              {/* links */}
            </div>
          </div>
          <div id="headerRightSide" className="flex justify-end">
            <button onClick={handleLogout} className="button-dark dark:button-light">
              Log out
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
