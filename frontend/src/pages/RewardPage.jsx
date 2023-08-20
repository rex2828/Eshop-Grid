import React, { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { getMyBalance, getTransactionHistory } from "../components/Tokens/TransactionFunctions";
import grid_coin from "../Assests/images/grid_coin.webp"
import { Grid } from 'react-loader-spinner'
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";

const RewardPage = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <div>
            <Header activeHeading={5} />
            <Reward user={user} />
            <Footer />
        </div>
    );
};


const Reward = ({ user }) => {
    const [balance, setBalance] = useState(0);
    const [transactionHis, setTransactionHis] = useState([]);
    const [couponData, setCouponData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showHistory, setShowHistory] = useState(false);
    const [showCoupons, setShowCoupons] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const balance = await getMyBalance();
                setBalance(balance.success ? balance.balance : 0);

                const transactionHis = await getTransactionHistory();
                console.log(transactionHis)
                setTransactionHis(transactionHis);

                axios.get(`${server}/coupon/get-all-coupons?bought=true`, {
                    withCredentials: true,
                }).then((res) => {
                    setCouponData(res.data.couponCodes);
                }).catch((error) => {
                    console.log(error)
                });

                setLoading(false);
            } catch (err) {
                console.log(err.message);
            }

        }
        fetchData();
    }, []);

    return (

        <div className="bg-slate-200 p-12">
            {
                loading && (
                    <div className="flex justify-center">
                        <Grid
                            height="80"
                            width="80"
                            color="#3321C8"
                            ariaLabel="grid-loading"
                            radius="12.5"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                )
            }
            {
                !loading && (
                    <>
                        <div id="HeaderBox" className="bg-white rounded-lg p-4 ms-80 me-80 mb-4">
                            <div className="flex justify-between border-b-2 pb-3 mb-5">
                                <div className="text-2xl font-semibold pt-2">
                                    {user.name.toUpperCase()}
                                </div>
                                <div className="bg-slate-200 p-1 rounded-md text-center ps-3 pe-3">
                                    <button className="" onClick={(event) => { setShowHistory(prev => !prev); }}>
                                        Show Payment History
                                    </button>
                                </div>
                                <div className="bg-slate-200 p-1 rounded-md text-center ps-3 pe-3">
                                    <button className="" onClick={(event) => { setShowCoupons(prev => !prev); }}>
                                        Show Coupons
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="text-orange-500 font-semibold text-2xl pb-3">Grid Coins</div>
                                <div className="text-[#3321C8] font-bold text-4xl flex content-center">
                                    <span>{balance}</span>
                                </div>
                            </div>


                        </div>
                        {
                            showHistory && (
                                <div id="HistoryBox" className="bg-white rounded-lg p-4 ms-80 me-80">

                                    {
                                        transactionHis.map((i) => {
                                            return (
                                                <div className="bg-slate-100 p-3 rounded-t-xl border-b-2 pb-1 mb-5 grid grid-cols-11 gap-3">
                                                    <div className="col-span-9">
                                                        <div className="text-orange-500 text-xl font-semibold pb-1">
                                                            To: {i.to}
                                                        </div>
                                                        <div className="text-md font-semibold">
                                                            From: {i.from}
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-span-1">
                                            <div className="flex flex-col text-center p-1 rounded-md justify-center content-center bg-[#FFBB38]">
                                                <span className="text-sm">Aug</span>
                                                <span className="text-xl text-semibold">21</span>
                                                <span className="text-sm">2023</span>

                                            </div>
                                        </div> */}
                                                    <div className="col-span-2 text-center bg-slate-100 rounded-md">
                                                        <div className="text-sm pb-1">
                                                            {i.date}
                                                        </div>
                                                        <div className="text-[#3321C8] text-2xl font-bold">
                                                            {i.value}
                                                        </div>
                                                    </div>


                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                        {
                            showCoupons && (
                                <div id="HistoryBox" className="bg-white rounded-lg p-4 ms-80 me-80">

                                    {
                                        couponData.map((i) => {
                                            return (
                                                // console.log(i?.name, i?.selectedProducts, i?.tokens, i?.value)
                                                <div className="bg-slate-100 p-3 rounded-t-xl border-b-2 pb-1 mb-5 grid grid-cols-11 gap-3">
                                                    <div className="col-span-9">
                                                        <div className="text-orange-500 text-xl font-semibold pb-1">
                                                            Name: {i.name}
                                                        </div>
                                                        <div className="text-md font-semibold">
                                                            Product: {i.selectedProducts}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2 text-center bg-slate-100 rounded-md">
                                                        <div className="text-sm pb-1">
                                                            Token : {i.tokens}
                                                        </div>
                                                        <div className="text-[#3321C8] text-2xl font-bold">
                                                            Discount {i.value}%
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }


        </div>
    )

    // Grid Coins {balance}
    // {
    // transactionHis.map((i) => (
    //     <div>
    //         your name: {i.from}
    //         <br/>
    //         sender's name: {i.to}
    //         <br/>
    //         amount {i.value}
    //         <br/>
    //     </div>
    // ))}
}

export default RewardPage;
