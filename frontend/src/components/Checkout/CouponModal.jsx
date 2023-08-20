import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { server } from "../../server";
import axios from 'axios';
import { Button } from '@material-ui/core';
import { AiFillShop, AiFillShopping, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai';
import { handleTransfer } from '../Tokens/TransactionFunctions';
import { toast } from 'react-toastify';


const CouponModal = ({ setOpen }) => {

    const [coupouns, setCoupouns] = useState([]);


    useEffect(() => {
        axios
            .get(`${server}/coupon/get-all-coupons?bought=false`, {
                withCredentials: true,
            })
            .then((res) => {
                setCoupouns(res.data.couponCodes);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    const columns = [
        { field: "id", headerName: "Id", minWidth: 10, flex: 0.7 },
        // {
        //     field: "name",
        //     headerName: "Coupon Code",
        //     minWidth: 30,
        //     flex: 1,
        // },
        {
            field: "price",
            headerName: "Value",
            minWidth: 30,
            flex: 0.6,
        },
        {
            field: "product",
            headerName: "Product",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "tokens",
            headerName: "Tokens",
            minWidth: 100,
            flex: 0.6,
        },

        {
            field: "buy",
            headerName: "Buy",
            minWidth: 30,
            flex: 0.6,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Button onClick={() => handleBuyCouponClick(params.id, params.row.tokens)}>
                        <AiOutlineShoppingCart size={30} />
                    </Button>
                </>)
            },
        }
    ];

    const handleBuyCouponClick = async (id, tokens) => {
        const res = await handleTransfer("0x9A8bA1e31e4a430f79302Bd76d319fB0C3780e92", tokens, false);
        console.log(res)
        if (res?.success) {
            await axios.post(`${server}/coupon/add-coupon`, {
                couponId: id,
            }, {
                withCredentials: true,
            },)
                .then((res) => {
                    toast.success("Transaction successful! Check your coupon in rewards page!")
                    setOpen(false);
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            toast.error("Transaction failed!");
        }
    };

    const row = [];

    coupouns &&
        coupouns.forEach((item, index) => {
            row.push({
                id: item._id,
                name: item.name,
                price: item.value + " %",
                product: item.selectedProducts,
                tokens: item.tokens,
                sold: 10,
            });
        });

    const getRowHeight = (params) => {
        return 100;
    };

    return (
        <div className="bg-[#fff]">
            <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
                <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
                    <RxCross1
                        size={30}
                        className="absolute right-3 top-3 z-50"
                        onClick={() => setOpen(false)}
                    />

                    <div className="block w-full 800px:flex mt-8">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                            getRowHeight={getRowHeight}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CouponModal