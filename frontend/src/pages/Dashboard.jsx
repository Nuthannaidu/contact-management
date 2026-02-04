import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import ContactViewModal from "../components/ContactViewModal";

export default function Dashboard({ token }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const loadContacts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_API}/api/contacts?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
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
    <>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Contact Manager
              </h1>
              <p className="text-slate-400">
                Manage and organize your contacts efficiently
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <SearchBar setSearch={setSearch} />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Contact */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 shadow-xl sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Add New Contact
                </h2>
                <ContactForm token={token} refresh={loadContacts} />
              </div>
            </div>

            {/* Contact List */}
            <div className="lg:col-span-2">
              <div className="glass-effect rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-4 flex justify-between items-center">
                  <span>Your Contacts</span>
                  <span className="text-sm bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                    {contacts.length}{" "}
                    {contacts.length === 1 ? "contact" : "contacts"}
                  </span>
                </h2>

                <ContactList
                  contacts={contacts}
                  token={token}
                  refresh={loadContacts}
                  onView={setSelectedContact}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Contact Modal */}
      <ContactViewModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
      />
    </>
  );
}
