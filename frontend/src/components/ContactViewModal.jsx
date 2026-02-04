export default function ContactViewModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 animate-slide-up">
        <div className="glass-effect rounded-2xl p-6 shadow-2xl border border-white/20">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Contact Details</h2>
              <p className="text-slate-400 text-sm">Personal information</p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700/60 text-slate-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/40">
              {contact.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-4 text-slate-300">
            <div className="bg-slate-800/40 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Name</p>
              <p className="text-lg text-white font-semibold">{contact.name}</p>
            </div>

            <div className="bg-slate-800/40 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Phone</p>
              <p className="text-base">{contact.phone}</p>
            </div>

            <div className="bg-slate-800/40 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Email</p>
              <p className="text-base break-all">
                {contact.email || "Not provided"}
              </p>
            </div>

            <div className="bg-slate-800/40 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Company</p>
              <p className="text-base">
                {contact.company || "Not provided"}
              </p>
            </div>

            {contact.notes && (
              <div className="bg-slate-800/40 rounded-lg p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Notes</p>
                <p className="text-base whitespace-pre-wrap">{contact.notes}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
