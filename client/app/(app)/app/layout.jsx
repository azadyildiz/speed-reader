import '../../globals.css'
import { Poppins } from 'next/font/google';
import Header from '@/components/appComponents/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Speed Reader',
  description: 'fastest way to read, word by word ⚡',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ToastContainer />
        <Header></Header>
        <div>{children}</div>
      </body>
    </html>
  );
}
