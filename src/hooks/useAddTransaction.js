import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    if (userId) { // Check if userId is not undefined
      await addDoc(transactionCollectionRef, {
        userId,
        description,
        transactionAmount,
        transactionType,
        createdAt: serverTimestamp(),
      });
    } else {
      // Handle the case where userId is undefined
      console.error("User not logged in, cannot add transaction");
    }
  };
  return { addTransaction };
};
