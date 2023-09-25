import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import config from '@/config';

import { postFiles } from '@/utils/api/file';

export default function CreateFileForm({ token, closePopup }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fileUpload: '',
    },
  });

  const onSubmit = async (data) => {
    await postFiles({ token, data: { fileName: data.fileUpload[0].name, file: data.fileUpload[0] } })
      .then((res) => {
        closePopup();
        router.refresh();
        toast.success(res.message, config.TOASTIFY_CONFIG);
      })
      .catch((err) => {
        toast.error(err.message, config.TOASTIFY_CONFIG);
      });
  };

  return (
    <div className="w-full h-screen divide-gray-500/10 fixed top-0 left-0 overflow-y-auto bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-light-color p-8 rounded-xl flex flex-col justify-center items-center relative">
        <button onClick={closePopup} className="absolute right-0 top-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="w-full m-8 text-center">Upload your file</h3>
        <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register('fileUpload', { required: true })} id="fileUpload" placeholder="Upload the file" name="fileUpload" type="file" className="text-input" />
            {errors.fileUpload && <p className="pt-2">You should upload a file.</p>}
          </div>
          <button className="flex justify-center items-center button-dark w-full">Create</button>
        </form>
      </div>
    </div>
  );
}
