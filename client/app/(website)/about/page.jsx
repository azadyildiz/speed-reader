import Link from 'next/link';

export const metadata = {
  title: 'About | Speed Reader',
  description: 'Speed Reader About Page',
};

export default function About() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div id="what-is-speedreader" className="py-12">
          <Link href="/about#what-is-speedreader">
            <h2 className="text-dark-color my-8">What is speedreader.app?</h2>
          </Link>
          <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit unde temporibus eligendi, accusamus ex placeat ab itaque voluptatibus, sed veritatis iusto iure minima sint ullam iste natus eius totam labore! Et ea quam animi maxime ut beatae nulla excepturi quis aut quasi voluptatibus ipsum doloremque architecto odit, quae officia non est iure doloribus. Omnis, iusto animi eos non commodi obcaecati officiis excepturi similique, nam porro blanditiis nisi vel. Unde, iure! Quam non neque qui voluptatem iusto similique nemo, aliquam dolorem quos? Rem incidunt ab cupiditate, dignissimos sit temporibus dicta eveniet praesentium, mollitia nisi doloremque nesciunt ipsa reprehenderit consectetur minus soluta.</div>
        </div>

        <div id="how-it-works" className="py-12">
          <Link href="/about#how-it-works">
            <h2 className="text-dark-color my-8">How it works?</h2>
          </Link>
          <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit unde temporibus eligendi, accusamus ex placeat ab itaque voluptatibus, sed veritatis iusto iure minima sint ullam iste natus eius totam labore! Et ea quam animi maxime ut beatae nulla excepturi quis aut quasi voluptatibus ipsum doloremque architecto odit, quae officia non est iure doloribus. Omnis, iusto animi eos non commodi obcaecati officiis excepturi similique, nam porro blanditiis nisi vel. Unde, iure! Quam non neque qui voluptatem iusto similique nemo, aliquam dolorem quos? Rem incidunt ab cupiditate, dignissimos sit temporibus dicta eveniet praesentium, mollitia nisi doloremque nesciunt ipsa reprehenderit consectetur minus soluta.</div>
        </div>
      </div>
    </>
  );
}
