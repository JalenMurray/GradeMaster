function BaseModal({ id, otherProps, children }) {
  return (
    <dialog id={id} className="modal modal-middle">
      <div className={`modal-box flex flex-col gap-4 ${otherProps}`}>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </dialog>
  );
}

export default BaseModal;
