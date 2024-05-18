import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  

  const transactionCollectionRef = collection(db, "transactions");
  const { userId } = useGetUserInfo();



  const getTransactions = async () => {
    let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "option-expense") {
            totalExpenses += Number(data.transactionAmount);
          } else {
            totalIncome += Number(data.transactionAmount);
          }

          console.log(totalIncome, totalExpenses);
          
        });

        setTransactions(docs);

        let balance = totalIncome - totalExpenses;

        const formattedBalance = balance.toFixed(2);
        const formattedIncome = totalIncome.toFixed(2);
        const formattedExpenses = totalExpenses.toFixed(2);

        setTransactionTotals({
          balance: parseFloat(formattedBalance),
          expenses: parseFloat(formattedExpenses),
          income: parseFloat(formattedIncome),
        });
        
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
