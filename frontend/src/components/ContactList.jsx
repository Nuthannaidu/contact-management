import { useNavigate } from "react-router-dom";

export default function ContactList({ contacts = [], token, refresh }) {
  const navigate = useNavigate();

  const del = async id => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_URL_API}/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      refresh();
    } catch (error) {
      alert("Failed to delete contact");
    }
  };

  if (!Array.isArray(contacts) || contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800/50 rounded-full mb-4">
          <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-slate-400 text-lg">No contacts found</p>
        <p className="text-slate-500 text-sm mt-2">Add your first contact to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((c, index) => (
        <div
          key={c._id}
          className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Contact Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-purple-500/30">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">{c.name}</h3>
                <p className="text-slate-400 text-sm truncate">{c.phone}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => navigate(`/contact/${c._id}`)}
                className="p-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-lg transition-all"
                title="Edit contact"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <button
                onClick={() => del(c._id)}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-all"
                title="Delete contact"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}