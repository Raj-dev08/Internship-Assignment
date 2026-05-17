import { Request, Response, NextFunction } from "express";
import Lead from "../model/leads.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const createLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { name, email, status, source } = req.body;

    if (!name || !email || !status || !source)
      return res.status(400).json({ message: "All fields required" });
  
    const existingLead = await Lead.findOne({ email });

    if (existingLead) { 
      return res.status(400).json({ message: "Lead with this email already exists" });
    }

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      userId: req.user?._id,
    });

    return res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = String(req.query.search || "");
    const Source = String(req.query.source || "");
    const Status = String(req.query.status || "");

    if (Source && !["website", "referral", "instagram"].includes(Source)) {
      return res.status(400).json({ message: "Invalid source filter" });
    }

    if (Status && !["new", "contacted", "qualified", "lost"].includes(Status)) {
      return res.status(400).json({ message: "Invalid status filter" });
    }


    const skip = (page - 1) * limit;

    const filter: any = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    if (Source) {
      filter.source = Source;
    }

    if (Status) {
      filter.status = Status;
    }


    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = page * limit < total;

    return res.status(200).json({
      leads,
      total,
      hasMore,
      page,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const lead = await Lead.findById(req.params.leadId);

    if (!lead)
      return res.status(404).json({ message: "Lead not found" });

    return res.status(200).json(lead);
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { name, email, status, source } = req.body;
    const lead = await Lead.findById(req.params.leadId);

    if (!lead)
      return res.status(404).json({ message: "Lead not found" });

    const isOwner =
      lead.userId.toString() === req.user?._id.toString();

    const isAdmin = req.user?.isAdmin;

    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Not allowed" });

    const updated = await Lead.findByIdAndUpdate(
      req.params.leadId,
      { name, email, status, source },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const lead = await Lead.findById(req.params.leadId);

    if (!lead)
      return res.status(404).json({ message: "Lead not found" });

    const isOwner =
      lead.userId.toString() === req.user?._id.toString();

    const isAdmin = req.user?.isAdmin;

    if (!isOwner && !isAdmin)
      return res.status(403).json({ message: "Not allowed" });

    await Lead.findByIdAndDelete(req.params.leadId);

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};