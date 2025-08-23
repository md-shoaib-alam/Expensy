import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageServices";

export const updateUser = async (
  uid: string,
  updatedData: UserDataType
): Promise<ResponseType> => {
  try {
    if(updatedData.image && updatedData?.image?.uri){
      const imageUploadRes = await uploadFileToCloudinary(updatedData.image,"users")
      if(!imageUploadRes.success){
        return{success:false,msg:imageUploadRes.msg ||" failed to upload image "}
      }
      updatedData.image = imageUploadRes.data
    }
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, updatedData);

    // fetch the user  and  update  the data
    return { success: true, msg: "updated successfully" };
  } catch (error: any) {
    console.log("error updating user", error);
    return { success: false, msg: error?.message };
  }
};
