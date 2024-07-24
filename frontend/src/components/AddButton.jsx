export default function AddButton({ onClick }) {
  return (
    <div className="fixed bottom-[90px] right-[50px] z-1">
      <button
        onClick={onClick}
        className="w-16 h-16 bg-blue-500 rounded-full text-5xl text-white flex justify-center"
      >
        +
      </button>
    </div>
  );
}
