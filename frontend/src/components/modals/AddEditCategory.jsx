import React, { useEffect, useState } from "react";
import Modal from "react-modal";

export default function AddEditCategory({ data, isOpen, onClose, setOpenModal, onSave }) {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('Tambah Kategori');
  const [textButton, setTextButton] = useState('Tambah')

  useEffect(() => {
    if (!isOpen) {
      setCategory('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      setText('Edit Kategori');
      setTextButton('Simpan');
      setCategory(data.data);
    } else {
      setText('Tambah Kategori');
      setTextButton('Tambah');
      setCategory('');
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ data: category });
    console.log(category);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-screen h-screen flex justify-center items-center absolute overflow-visible"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="w-full h-full absolute top-0" onClick={() => setOpenModal(false)}></div>
      <div className="bg-white w-[90%] md:w-1/2 lg:w-1/3 p-8 rounded-lg relative z-60 max-h-[90%] overflow-y-auto shadow-lg transform transition-all duration-500 ease-in-out">
        <h1 className="text-black text-3xl font-semibold text-center mb-4">
          {text}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-lg text-lg flex flex-col gap-1"
        >
          <label className="flex flex-col gap-1">
            Kategori
            <input
              className="focus:outline-none px-4 py-2 rounded-lg border border-gray-300"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              {textButton}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
