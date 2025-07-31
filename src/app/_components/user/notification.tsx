type TopbarNotificationProps = {
    show: boolean;
    onClose: () => void;
  };
  

export default function TopbarNotification({ show, onClose }: TopbarNotificationProps) {
    if (!show) return null;
  
    return (
      <div className="top-0 inset-x-0 mx-4 py-4 z-50 bg-red-300 text-white text-sm p-3 flex items-center justify-between shadow-md rounded-xl">
        {/* <div className="absolute bottom-10 right-10 w-10 h-10 bg-black rounded-full text-center text-white items-center">i</div> */}
        <span className="truncate">
            Besok adalah jadwal kontrol Anda.
        </span>
        <button
          onClick={onClose}
          className="ml-3 p-1 rounded "
          aria-label="Dismiss"
        >
            x
        </button>
      </div>
    );
  }