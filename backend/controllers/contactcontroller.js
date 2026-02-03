const Contact = require("../models/Contact");


exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      userId: req.user
    });

    res.status(201).json(contact);
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      return res.status(400).json({ message: firstError });
    }

    res.status(500).json({ message: "Server error" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const search = req.query.search || "";

    const contacts = await Contact.find({
      userId: req.user,
      name: { $regex: search, $options: "i" }
    });

    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      {
        new: true,
        runValidators: true 
      }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      return res.status(400).json({ message: firstError });
    }

    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
