import React, { useState } from 'react';
import './index.css';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from 'firebase/auth';
import { auth } from "../../config/firebase-config";
import { useNavigate } from 'react-router-dom';

export const MoneyMinder = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();


  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;


  const onSubmit  = (e) => {
    e.preventDefault()
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
 
  };

  const singUserOut = async() => {
    try{
      await signOut(auth);
      localStorage.clear()
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate("/")
    } catch (err){
      console.error(err);
    }
  }

    return(
      <div className='main-container'>
        <div className='header'>
            
            {profilePhoto && (
              <div className='profile'>
                {" "}
                <img className='my-photo' src={profilePhoto} alt='Profile'/>
                <button className='signout-btn' onClick={singUserOut} >
                  <span className='sign-out-text'>Sign Out</span>
                </button>
              </div>
            )}
            <span className='expense-tracker'> Expense Tracker</span>
            <span className='user-name'>{name}</span>
        </div>

        <div className='flex-row-e'>
            <span className='my-balance'>My Balance</span>
        </div>
    
        <div className='balance'>
          {balance >= 0 ? <span className='balance-value'>Rs: {balance}</span> : <span className='balance-value'>-${balance}</span>}
        </div>

        <span className='incomes'>Income</span>
        <span className='expenses'>Expenses</span>
        <div className='txt-income'>
          <span className='income-value'>Rs: {income}</span>
        </div>
        <div className='txt-expense'>
          <span className='expense-value'>Rs: {expenses}</span>
        </div>

        <span className='new-transaction'>New Transaction</span>
        
        <form className="add-transaction" onSubmit={onSubmit} >
                <div>
                    <label htmlFor='transaction-name' className='name'>Name</label>
                    <input 
                      type='text' 
                      id='transaction-name' 
                      placeholder='Description' 
                      value={description}
                      className='new-name' 
                      required
                      onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='transaction-value' className='value'>Value</label>
                    <input 
                      type='number' 
                      id='transaction-value' 
                      placeholder='Amount' 
                      value={transactionAmount}
                      className='new-value' 
                      required 
                      onChange={(e) => setTransactionAmount(e.target.value)}/>
                </div>

                <div className='radio-option'>
                <label htmlFor='option-income' className='income'>Income</label>
                    <input 
                      type='radio' 
                      id='option-income' 
                      name='transaction-type' 
                      value='option-income'
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    
                    <label htmlFor='option-expense' className='expense'>Expense</label>
                    <input 
                      type='radio' 
                      id='option-expense' 
                      name='transaction-type' 
                      value='option-expense'
                      onChange={(e) => setTransactionType(e.target.value)} />    
                </div>

                <div className='add-new-btn'>
                  <button type='submit'>Add Transaction</button>
                </div>

                
                
            </form>

            <div className='transactions'>
              <span className='transactions-1'>Transactions</span>
              <ul>
                {transactions.map((transaction) => {
                const { description, transactionAmount, transactionType } = transaction;
                return (
                <li>
                  <h4> {description} </h4>
                  <p>
                  Rs: {transactionAmount} • {" "}
                    <label style={{ color: transactionType === "option-expense" ? "red" : "green",}}>
                      {" "}
                      {transactionType}{" "}
                    </label>
                  </p>
                </li>
                );
                })}
              </ul>
            </div>


            
    </div>
    ); 
}