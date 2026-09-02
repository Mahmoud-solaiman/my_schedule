import { Response, Request } from "express"


export const getSchedule = (req: Request, res: Response) => {
  try {
    const userIp = req.ip;
    res.json({
      message: "Your request was successful",
      userIp
    });
  } catch (error) {
    res.json({ 
      message: "Internal server error", 
      error
    });
  }
}