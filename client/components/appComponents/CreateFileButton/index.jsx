'use client';

import CreateFileForm from '../CreateFileForm';
import { useState } from 'react';

export default function CreateFileButton({ className, token }) {

  const [newFilePopup, setNewFilePopup] = useState(false);

  function openPopup() {
    setNewFilePopup(true);
  }

  function closePopup() {
    setNewFilePopup(false);
  }
  return (
    <>
    <button onClick={openPopup} className={className}>
      New File
    </button>
    {newFilePopup ? <CreateFileForm token={token} closePopup={closePopup} ></CreateFileForm> : ''}
    </>
  );
}
