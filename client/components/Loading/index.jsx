import React from 'react';

export default function Loading() {
  return (
    <>
      <div className="calculated-website-height w-full z-50 overflow-hidden bg-light-color opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-900 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-gray-900 text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-gray-900">This may take a few seconds, please don't close this page.</p>
      </div>
    </>
  );
}