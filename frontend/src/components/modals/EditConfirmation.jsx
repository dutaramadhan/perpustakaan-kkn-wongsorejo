import Modal from "react-modal";

export default function EditConfirmation({isOpen, setIsOpen, onClick}){
    return(
      <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="flex justify-center items-center absolute inset-0 bg-white p-4 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Edit</h2>
        <p>Apakah Anda yakin ingin menyimpan perubahan ini?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClick}
          >
            Simpan
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Batal
          </button>
        </div>
      </div>
    </Modal> 
    )
}