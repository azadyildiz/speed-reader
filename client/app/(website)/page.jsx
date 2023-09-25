import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="px-6 py-24 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl md:-top-80" aria-hidden="true"></div>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-dark-color">Fastest way to read, word by word ⚡</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload the file, choose how many words you want to read per minute, start reading faster with <span className="text-lg text-brand-color font-bold">Speed Reader</span>.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link className="button-dark" href="/register">
                Get Started
              </Link>
              <Link className="text-base font-semibold leading-6 text-dark-color hover:opacity-80 transition-opacity duration-200" href="/try-demo">
                Try Demo
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-dark-color to-gray-800 px-6 py-16 shadow-2xl md:rounded-3xl md:px-16 md:pt-24 md:flex md:gap-x-20 lg:px-16 lg:pt-0">
          <div className="mx-auto max-w-md text-center md:mx-0 md:flex-auto md:py-24 md:text-left">
            <h2 className="text-light-color">
              Speed up your reading.
              <br />
              Start using Speed Reader.
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-300">
              Speed Reader is an application that helps you read faster. You can increase your reading speed by reading word by word.
              <br />
              <br />
              You can read a <span className="text-brand-color">200-page book</span> in about <span className="text-brand-color">2 hours</span>
              <br />
              <br />
              Just upload the file and start reading faster!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 md:justify-start">
              <Link className="button-light" href="/register">
                Get Started
              </Link>
              <Link className="text-base font-semibold leading-6 text-light-color hover:opacity-80" href="/try-demo">
                Try Demo
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 md:mt-8">
            {/* <img className="absolute left-0 top-6 w-[57rem] max-w-none rounded-md bg-light-color/5 ring-1 ring-light-color/10" src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" width={1824} height={1080} /> */}
          </div>
        </div>
      </div>

      <div className="py-24 mx-auto px-6 lg:px-8 max-w-3xl text-center">
        <p className="text-center font-semibold leading-7 text-brand-color">speedreader.app</p>
        <h2 className="mt-2 text-dark-color">Read <span className='text-brand-color'>3x</span> faster with Speed Reader</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          ✔️ Finish your favorite e-books faster.
          <br />
          ✔️ Read your docs faster.
          <br/>
          ✔️ Read faster.
        </p>
      </div>
    </>
  );
}
