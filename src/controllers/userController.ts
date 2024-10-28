import { Request, Response } from "express";
import User, { Gender } from "../entities/user";

interface UpdateUserData {
  name?: string;
  photoUrl?: string;
  address?: string;
  studentNum?: string;
  photoBase64?: string;
  gender?: Gender;
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log("updateUser", updateUser);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOneBy({ id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    const { name, photoUrl, address, studentNum, gender }: UpdateUserData =
      req.body;

    Object.assign(user, {
      name,
      photoUrl,
      address,
      studentNum,

      gender,
      // gender: req.body.gender,
    });

    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Error updating user" });
  }
};
