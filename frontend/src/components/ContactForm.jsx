import { useState } from "react";

export default function ContactForm({ token, refresh }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Name and phone are required");
      return;
    }

    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_URL_API}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          company: company || undefined,
        }),
      });

      setName("");
      setPhone("");
      setEmail("");
      setCompany("");
      refresh();
    } catch {
      alert("Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
      />

      <input
        type="tel"
        placeholder="Phone Number *"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Company (optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 disabled:opacity-50 transition"
      >
        {loading ? "Adding contact..." : "Add Contact"}
      </button>
    </form>
  );
}
