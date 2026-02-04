import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ContactDetails({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidPhone = phone => /^[0-9]{10}$/.test(phone);
  const isValidEmail = email =>
    !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const loadContact = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_API}/api/contacts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setContact({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        company: data.company || "",
        notes: data.notes || ""
      });
    } catch {
      alert("Failed to load contact");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  const updateContact = async () => {
    setPhoneError("");
    setEmailError("");

    if (!contact.name || !contact.phone) {
      alert("Name and phone are required");
      return;
    }

    if (!isValidPhone(contact.phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    if (!isValidEmail(contact.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_API}/api/contacts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(contact)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Contact updated successfully!");
      navigate("/");
    } catch {
      alert("Failed to update contact");
    } finally {
      setSaving(false);
    }
  };

  const deleteContact = async () => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await fetch(
        `${import.meta.env.VITE_URL_API}/api/contacts/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Contact deleted successfully!");
      navigate("/");
    } catch {
      alert("Failed to delete contact");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Loading contact...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-white mb-6"
        >
          ← Back
        </button>

        <div className="glass-effect rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Contact</h1>

          <div className="space-y-5">
            <input
              type="text"
              value={contact.name}
              onChange={e =>
                setContact({ ...contact, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
            />

            <div>
              <input
                type="tel"
                value={contact.phone}
                maxLength={10}
                onChange={e => {
                  const value = e.target.value.replace(/\D/g, "");
                  setContact({ ...contact, phone: value });
                  setPhoneError("");
                }}
                placeholder="Phone (10 digits)"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
              />
              {phoneError && (
                <p className="text-red-400 text-sm mt-1">
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                value={contact.email}
                onChange={e => {
                  setContact({ ...contact, email: e.target.value });
                  setEmailError("");
                }}
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <input
              type="text"
              value={contact.company}
              onChange={e =>
                setContact({ ...contact, company: e.target.value })
              }
              placeholder="Company"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
            />

            <textarea
              rows={4}
              value={contact.notes}
              onChange={e =>
                setContact({ ...contact, notes: e.target.value })
              }
              placeholder="Notes"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white"
            />

            <div className="flex gap-3 pt-4">
              <button
                onClick={updateContact}
                disabled={saving}
                className="flex-1 py-3 bg-purple-600 text-white rounded-lg"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                onClick={deleteContact}
                className="px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
