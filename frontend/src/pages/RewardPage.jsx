import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { getMyBalance , getTransactionHistory } from "../components/Tokens/TransactionFunctions";

const RewardPage = () => {
    return (
      <div>
        <Header activeHeading={5} />
        <Reward />
        <Footer />
      </div>
    );
};

var isLoaded = false;


const Reward = () => {
    const [balance, setBalance] = useState(0);
    const [transactionHis, setTransactionHis] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const balance = await getMyBalance();
            setBalance(balance.success ? balance.balance : 0);
            
            const transactionHis = await getTransactionHistory();
            setTransactionHis(transactionHis);
        }
        fetchData();
    }, []);
    
    return <>
    
    Grid Coins {balance}
    {
    transactionHis.map((i) => (
        <div>
            your name: {i.from}
            <br/>
            sender's name: {i.to}
            <br/>
            amount {i.value}
            <br/>
        </div>
    ))}
    </>
}

export default RewardPage;
