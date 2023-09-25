import { getFiles } from '@/utils/api/file';
import { getCookie } from '@/utils/cookieController';

import Table from '@/components/appComponents/Table';
import Unauth from '@/components/appComponents/Unauth';
import CreateFileButton from '@/components/appComponents/CreateFileButton';

export default async function Home() {
  var files = {};
  const token = await getCookie('token')
    .then(async (res) => {
      // Cookie found. Get files.
      files = await getFiles({ token: res.token })
        .then((res) => res)
        .catch((rej) => rej);
        return res;
    })
    .catch((err) => {
      // Cookie cannot found
      files = { status: false, message: err.message };
      return err;
    });
  return (
    <div className="mx-auto max-w-7xl p-6 md:px-8 flex flex-col items-end">
      {files.status ? <><CreateFileButton token={token.token} className="button-dark mb-4"></CreateFileButton><Table token={token.token} data={files.data}></Table></> : <Unauth message={files.message}></Unauth>}
    </div>
  );
}
