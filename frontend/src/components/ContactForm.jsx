import { useState } from "react";

export default function ContactForm({ token, refresh }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const add = async () => {
    setPhoneError("");

    if (!name || !phone) {
      alert("Name and phone are required");
      return;
    }

    if (!isValidPhone(phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone })
      });

      if (!res.ok) {
        throw new Error("Failed to add contact");
      }

      setName("");
      setPhone("");
      refresh();
    } catch (error) {
      alert("Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      add();
    }
  };

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          placeholder="Phone Number (10 digits)"
          value={phone}
          onChange={e => {
            // allow only digits
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
            setPhoneError("");
          }}
          maxLength={10}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />

        {phoneError && (
          <p className="mt-1 text-sm text-red-400">
            {phoneError}
          </p>
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={add}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Contact
          </>
        )}
      </button>
    </div>
  );
}
