import React, { useEffect } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import NotesIcon from '@mui/icons-material/Notes';
import { myOrders, clearErrors } from '../../../Redux/action/orderAction';
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';

const MyOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const { user } = useSelector((state) => state.user);

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            sortable: false,
            flex: 1
        }, {
            field: "itemsQty",
            headerName: "Items",
            type: "number",
            minWidth: 150,
            sortable: false,
            flex: 0.4
        }, {
            field: "status",
            headerName: "Status",
            type: "number",
            minWidth: 150,
            flex: 0.4,
            sortable: false,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        }, {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            sortable: false,
            flex: 0.4
        }, {
            field: "actions",
            flex: 0.3,
            headerName: "About",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link className='orderLink' to={`/order/${params.getValue(params.id, "id")}`}>
                        <NotesIcon />
                    </Link>
                );
            },
        }
    ];

    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        dispatch(myOrders());

    }, [dispatch, error]);

    return (
        <>
            <Metadata title={"My orders"} />
            {loading ? (
                <Loading />
            ) : (
                <div className="myOrdersPage">
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        disableColumnMenu
                        className="myOrdersTable"
                        autoHeight
                    />
                </div>
            )}
        </>
    )
}

export default MyOrders