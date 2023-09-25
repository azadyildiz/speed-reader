import { getFile } from "@/utils/api/file";
import { getCookie } from "@/utils/cookieController";

import Reader from "@/components/appComponents/Reader";
import Unauth from "@/components/appComponents/Unauth";


export default async function App({ params }) {
  var file = {};
  const token = await getCookie('token')
    .then(async (res) => {
      // Cookie found. Get files.
      file = await getFile({ token: res.token, fileId: params.fileId })
        .then((res) => res)
        .catch((rej) => rej);
        return res;
    })
    .catch((err) => {
      // Cookie cannot found
      file = { status: false, message: err.message };
      return err;
    });
  return (
    file.status ? <Reader file={file.data} token={token.token}></Reader> : <Unauth statusCode={file.statusCode} message={file.message}></Unauth>
    );
}
