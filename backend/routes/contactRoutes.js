const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Contact = require("../models/Contact");
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require("../controllers/contactcontroller");

router.use(auth);

// CREATE
router.post("/", createContact);

router.get("/", getContacts);

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contact" });
  }
});

// UPDATE ka
router.put("/:id", updateContact);

// DELETE ka
router.delete("/:id", deleteContact);

module.exports = router;
