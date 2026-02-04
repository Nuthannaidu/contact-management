export default function ContactViewModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-effect rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">
          Contact Details
        </h2>

        <div className="space-y-3 text-slate-300">
          <div>
            <p className="text-sm text-slate-400">Name</p>
            <p className="text-lg text-white">{contact.name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p>{contact.email || "—"}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p>{contact.phone}</p>
          </div>

          {contact.notes && (
            <div>
              <p className="text-sm text-slate-400">Notes</p>
              <p className="whitespace-pre-wrap">{contact.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
