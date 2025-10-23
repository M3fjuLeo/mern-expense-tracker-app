const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex items-center gap-4 flex-col justify-between bg-white rounded-2xl shadow-lg p-4 max-w-2xl w-full">
        <div className="flex items-center border-b-1 border-gray-300 justify-between w-full">
          <h1 className="font-medium text-xl">{title}</h1>
          <button
            onClick={onClose}
            className="font-light text-3xl cursor-pointer"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
