import Link from "next/link";

export const metadata = {
  title: 'Pricing | Speed Reader',
  description: 'Speed Reader Pricing Page',
};

export default function Pricing() {
  return (
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Designed for those who like to read</h2>    
          <p className="mb-5 font-light text-gray-600 sm:text-xl">Do you want to speed up your reading speed without any training? You're lucky to have Speed Reader. But wait... Since you're on this page, you still don't have it. Choose the plan that suits your budget and start reading fast. Before we forget... we need to pay our developer's salary 👉👈</p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="w-full flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-light-color rounded-lg border border-gray-100 shadow">
            <h3 className="mb-4 text-2xl font-semibold">Free</h3>
            <p className="font-light text-gray-600 sm:text-lg">Some limit, but still speed up.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
            </ul>
            <Link className="button-dark" href="/register">Get started</Link>
          </div>
          <div className="w-full flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-light-color rounded-lg border border-gray-100 shadow">
            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
            <p className="font-light text-gray-600 sm:text-lg">No limit, just speed.</p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$4</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
              <li className="flex items-center space-x-3">
              </li>
            </ul>
            <Link className="button-dark" href="/register">Get started</Link>
          </div>
        </div>
      </div>
  );
}
