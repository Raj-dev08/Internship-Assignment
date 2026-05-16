import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controller/leads.controller.js";



const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:leadId", getLeadById);
router.put("/:leadId", updateLead);
router.delete("/:leadId", deleteLead);

export default router;