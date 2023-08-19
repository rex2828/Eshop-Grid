import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";

export const getMyBalance = async () => {
    try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const erc20 = new ethers.Contract(
            "0xdCA8A260cAC0ffA3F117742d47Dd7052C3422d4a", // hard coded
            erc20abi.abi,
            provider
        );
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const balance = await erc20.balanceOf(signerAddress);
        const balanceInEther = ethers.utils.formatEther(balance);
        return {
            success: true,
            address: signerAddress,
            balance: String(balanceInEther)
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error,
        };
    }
};

export const handleTransfer = async (recipientAddr, amount, fromOwnerWallet) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        let signer;
        if (fromOwnerWallet) {
            signer = new ethers.Wallet(
                "6b111796b750311d424607d76c39c6ecb6a6be9e02ed2d26fef4aede77f33481",
                provider
            );
            const recipient = await provider.getSigner();
            recipientAddr = await recipient.getAddress();
        } else {
            signer = await provider.getSigner();
        }
        const erc20 = new ethers.Contract(
            "0xdCA8A260cAC0ffA3F117742d47Dd7052C3422d4a", // hard coded
            erc20abi.abi,
            signer
        );
        amount = amount / 100
        const amountInWei = ethers.utils.parseUnits(amount.toString(), "ether").toString();
        const res = await erc20.transfer(recipientAddr, amountInWei);
        return {
            success: true,
            result: res,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error
        };
    }
};


export const getTransactionHistory = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const erc20 = new ethers.Contract(
            "0xdCA8A260cAC0ffA3F117742d47Dd7052C3422d4a", // hard coded
            erc20abi.abi,
            provider
        );
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        const filterFrom = erc20.filters.Transfer(signerAddress, null);
        const filterTo = erc20.filters.Transfer(null, signerAddress);

        const fromArr = await erc20.queryFilter(filterFrom);
        const toArr = await erc20.queryFilter(filterTo);
        var list = [...fromArr, ...toArr]

        for(var i=0;i<list.length;i++){
            list[i] = {
                from: list[i].args[0],
                to: list[i].args[1],
                value: list[i].args[2].toString()
            }
        }
        
        return list;
    }catch(e) {
        console.log(e);
        return [];
    }
}