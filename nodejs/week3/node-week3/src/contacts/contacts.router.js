import express from "express";
import { StatusCodes } from "http-status-codes";
import { knexInstance } from "../database.js";

export const router = express.Router();

import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  phone: Joi.string().min(5).max(20).required(),
});

// GET all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await knexInstance("contacts").select("*");
    res.status(StatusCodes.OK).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch contacts",
    });
  }
});

// GET contact by ID
// router.post("/contacts", async (req, res) => {
//   try {
//     await knexInstance("contacts").insert(req.body);
//     res.status(StatusCodes.CREATED).json({});
//   } catch (error) {
//     console.error("Error inserting contact:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Internal server error, failed to add contact",
//     });
//   }
// });

router.post("/contacts", async (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  try {
    await knexInstance("contacts").insert(value);
    res.status(StatusCodes.CREATED).json({});
  } catch (error) {
    console.error("Error inserting contact:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to add contact",
    });
  }
});

// GET contact by ID
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await knexInstance("contacts")
      .where({ id: req.params.id })
      .first();

    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Contact not found" });
    }

    res.status(StatusCodes.OK).json(contact);
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to fetch contact",
    });
  }
});

// PUT update contact by ID
// router.put("/contacts/:id", async (req, res) => {
//   try {
//     const updated = await knexInstance("contacts")
//       .where({ id: req.params.id })
//       .update(req.body)
//       .returning("*");

//     if (updated.length === 0) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ error: "Contact not found" });
//     }

//     res.status(StatusCodes.OK).json(updated[0]);
//   } catch (error) {
//     console.error("Error updating contact:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Internal server error, failed to update contact",
//     });
//   }
// });

router.put("/contacts/:id", async (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
  }

  try {
    const updated = await knexInstance("contacts")
      .where({ id: req.params.id })
      .update(value)
      .returning("*");

    if (updated.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Contact not found" });
    }

    res.status(StatusCodes.OK).json(updated[0]);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to update contact",
    });
  }
});

// DELETE contact by ID
router.delete("/contacts/:id", async (req, res) => {
  try {
    const deleted = await knexInstance("contacts")
      .where({ id: req.params.id })
      .del();

    if (deleted === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Contact not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error, failed to delete contact",
    });
  }
});
