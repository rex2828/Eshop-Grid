import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";

const RulesPage = () => {
    return (
        <div>
            <Header activeHeading={6} />
            <Rules />
            <Footer />
        </div>
    );
};

const Rules = () => {
    return <>
    <div className="max-w-[800px] mx-auto my-0">
        <br></br>
        <h1 className='text-[#333] text-center text-[2em] flex items-center justify-center mb-5 before:content-["\1F4B0"] before:text-[1.2em] before:mr-2.5 font-semibold'>Fungible Token Earning Rules</h1> 

        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-shopping-cart mr-2.5"></i> Purchase Transactions:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">Users earn fungible tokens based on the total purchase amount.</li>
            <li className="mb-2.5">Criteria: For every $1 spent on eligible products, users receive 0.1 fungible tokens.</li>
            <li className="mb-2.5">Tokens earned from purchases are credited to the user's digital wallet upon transaction confirmation.</li>
            <li className="mb-2.5">Only eligible products, as defined by the platform, contribute to token earnings.</li>
            </ul>
        </div>

        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-users mr-2.5"></i> Referral Actions:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">Users can earn fungible tokens by referring new users to the platform.</li>
            <li className="mb-2.5">Criteria: When a referred user registers, the referrer receives 25 fungible tokens.</li>
            </ul>
        </div>

        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-share-alt mr-2.5"></i> Social Media Interactions:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">Users can earn fungible tokens by reviewing their purchased products.</li>
            <li className="mb-2.5">Criteria: For each review on the platform user earns 10 fungible tokens.</li>
            </ul>
        </div>

        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-wallet mr-2.5"></i> Token Distribution and Transparency:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">Fungible tokens earned through various actions are securely stored in the user's digital wallet linked to their platform account.</li>
            <li className="mb-2.5">Users can view their current fungible token balance and transaction history within their platform's reward page.</li>
            <li className="mb-2.5">A summary of earned tokens and transaction history is easily accessible and comprehensible on reward page.</li>
            </ul>
        </div>

        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-wallet mr-2.5"></i> Token Redemption:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">Users can redeem their earned fungible tokens for buying various discount coupons.</li>
            <li className="mb-2.5">Available redemption options, including the number of tokens required for each reward, should be clearly displayed.</li>
            </ul>
        </div>
        
        <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-transform duration-[0.3s,box-shadow] delay-[0.3s] mb-5 p-5 rounded-lg hover:translate-y-[-5px] hover:shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <h2 className="font-semibold text-[#555] text-[1.2em] flex items-center mb-2.5"><i className="fas fa-wallet mr-2.5"></i> Transaction Transparency:</h2>
            <ul className="list-disc pl-5">
            <li className="mb-2.5">All transactions related to the earning, spending, and transfer of fungible tokens will be recorded on the blockchain.</li>
            <li className="mb-2.5">Users can access the blockchain to independently verify and validate their transactions.</li>
            </ul>
        </div>

        </div>
    </>
}

export default RulesPage;