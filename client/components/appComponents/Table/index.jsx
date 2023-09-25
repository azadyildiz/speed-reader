'use client';

import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';

import config from '../../../config';
import { getFile, deleteFiles } from '@/utils/api/file';

export default function Table({ token, data }) {
  const router = useRouter();

  // /app/:fileId route request. öylesine burda duruyor
  async function handleRead(fileId) {
    router.push(`/app/${fileId}`)
  }

  async function handleDelete(token, fileId) {
    await deleteFiles({ token, fileId })
      .then(async (res) => {
        router.refresh()
        toast.success(res.message, config.TOASTIFY_CONFIG);
      })
      .catch((err) => {
        toast.error(err.message, config.TOASTIFY_CONFIG);
      });
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-xs sm:text-sm text-center text-dark-color dark:text-light-color">
        <thead className="text-sm text-dark-color uppercase bg-light-color dark:bg-dark-color dark:text-light-color">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/12">
              NO
            </th>
            <th scope="col" className="px-6 py-3">
              FILE NAME
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              WORD YOU STAYED / TOTAL WORDS
            </th>
            <th scope="col" className="px-6 py-3 w-1/5">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((file, i) => {
            return (
              <tr key={i} className="bg-light-color text-dark-color border-b dark:bg-gray-600 dark:border-gray-700 dark:text-light-color">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-light-color">
                  {i + 1}
                </td>
                <td className="px-6 py-4">{file.fileName}</td>
                <td className="px-6 py-4">
                  {file.wordIndex} / {file.fileWordsLength}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleRead(file.id)} className="bg-dark-color inline-block p-[4px] rounded-[6px] mr-2 hover:opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} className="w-5 h-5 fill-light-color stroke-dark-color dark:fill-light-color dark:stroke-light-color">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    <span className="sr-only">Read</span>
                  </button>
                  <button onClick={() => handleDelete(token, file.id)} className=" bg-red-700 inline-block p-[4px] rounded-[6px] dark:bg-red-700 hover:opacity-80">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={0} className="w-5 h-5 fill-light-color stroke-dark-color dark:fill-light-color dark:stroke-light-color">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    <span className="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
