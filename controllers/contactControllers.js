const Contact = require("../model/contactModel");
const mongoose = require("mongoose")

//@desc Get all contact
//@route Get /api/contacts
//@access public
const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

//@desc Get contact by id
//@route Get /api/contacts/:id
//@access public
const createContact = async (req, res) => {
  console.log("The requested body is:", req.body);
  
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const contact = await Contact.create({ name, email, phone });

    res.status(201).json({
      message: "Contact created successfully",
      contact
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact", error: error.message });
  }
};
//@desc Get contact
//@route Get /api/contacts/:id
//@access public
const getContact = async (req, res, next) => {
  const { id } = req.params;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid contact ID format");
    error.statusCode = 400; // Bad request for invalid ID format
    return next(error); // Pass the error to the next middleware
  }

  try {
    // Find the contact by ID
    const contact = await Contact.findById(id);

    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404; // Not found
      return next(error); // Pass the error to the next middleware
    }

    res.status(200).json(contact); // Send the contact data
  } catch (error) {
    // If there's any database or server error, pass it to error handler middleware
    next(error); // Ensure no further response is sent
  }
};

//@desc Update contact
//@route Get /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  res.status(200).json({ message: `Contact Updated of ${req.params.id}` });
};

//@desc Delete contact
//@route Get /api/contacts/:id
//@access public
const deleteContact =async (req, res) => {
  try {
    if(!req.params.id){
      return res.status(400).json({message:"Required Id"})
  }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Contact Deleted sucessfully"})
  } catch (error) {
    res.status(500).json({message: "Server Error", error: error.message})
  }
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
