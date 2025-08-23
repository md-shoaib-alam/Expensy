import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    // image upload pending
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    // fetch the user  and  update  the data
    return { success: true, msg: "updated successfully" };
  } catch (error: any) {
    console.log("error updating user", error);
    return { success: false, msg: error?.message };
  }
};
