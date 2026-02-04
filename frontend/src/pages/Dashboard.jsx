import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";

export default function Dashboard({ token }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const loadContacts = async () => {
    try {
      const res = await fetch(
       `${import.meta.env.VITE_URL_API}/api/contacts?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setContacts([]);
      }
    } catch (err) {
      alert("Failed to load contacts");
    }
  };

  useEffect(() => {
    loadContacts();
  }, [search]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Manager</h1>
            <p className="text-slate-400">Manage and organize your contacts efficiently</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar setSearch={setSearch} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Contact Form */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl p-6 shadow-xl sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Contact
              </h2>
              <ContactForm token={token} refresh={loadContacts} />
            </div>
          </div>

          {/* Contact List */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Your Contacts
                </span>
                <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                  {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
                </span>
              </h2>
              <ContactList contacts={contacts} token={token} refresh={loadContacts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}