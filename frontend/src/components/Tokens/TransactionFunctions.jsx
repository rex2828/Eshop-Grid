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
        if (fromOwnerWallet && !recipientAddr) {
            signer = new ethers.Wallet(
                "6b111796b750311d424607d76c39c6ecb6a6be9e02ed2d26fef4aede77f33481",
                provider
            );
            const recipient = await provider.getSigner();
            recipientAddr = await recipient.getAddress();
        } else if (fromOwnerWallet && recipientAddr) {
            signer = new ethers.Wallet(
                "6b111796b750311d424607d76c39c6ecb6a6be9e02ed2d26fef4aede77f33481",
                provider
            );
        } else {
            signer = await provider.getSigner();
        }
        const erc20 = new ethers.Contract(
            "0xdCA8A260cAC0ffA3F117742d47Dd7052C3422d4a", // hard coded
            erc20abi.abi,
            signer
        );
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

function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
        return `${day}th`;
    }

    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
    }
}

function formatTimestamp(timestamp) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const monthName = months[date.getMonth()];
    const day = getDayWithSuffix(date.getDate());

    const hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedString = `${monthName} ${day}, ${year} ${formattedHours}:${minutes} ${ampm}`;
    return formattedString;
}


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


        for (var i = 0; i < list.length; i++) {
            const d = await provider.getBlock(list[i].blockNumber);
            list[i] = {
                from: list[i].args[0],
                to: list[i].args[1],
                value: ethers.utils.formatEther(list[i].args[2]),
                date: formatTimestamp(d.timestamp * 1000)
            }
        }

        return list;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export const connectSiteToWallet = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        await provider.getSigner();
        return {
            success: true
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error
        };

    }
}