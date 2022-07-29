import React, { useEffect } from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../Sidebar"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from "../../Layouts/Toast"
import ToastContainerBox from "../../Layouts/ToastContainerBox"
import { clearErrors, deleteOrder, getAllOrders } from '../../../Redux/action/orderAction';
import { DELETE_ORDER_RESET } from '../../../Redux/constant/orderConstant';
import Metadata from '../../Layouts/MetaData';

const ProductList = ({ history }) => {
    const dispatch = useDispatch();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            sortable: false,
            minWidth: 250, 
            flex: 0.6
        },
        {
            field: "status",
            headerName: "Status",
            type: "number",
            minWidth: 160,
            sortable: false,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items",
            type: "number",
            sortable: false,
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            sortable: false,
            minWidth: 200,
            flex: 0.5,
        }, 
        {
            field: "actions",
            flex: 0.5,
            headerName: "Actions",
            minWidth: 200,
            type: "number",  
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <ModeEditIcon />
                        </Link>
                        <Button id="deleteIconDeshboard" onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (deleteError) {
            Toast({
                msg: deleteError
            });

            dispatch(clearErrors());
        }

        if (isDeleted) { 
            Toast({
                msg: "Order Deleted succesfully"
            });

            history.push("/admin/orders");
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());

    }, [dispatch, error, history, deleteError, isDeleted]);

    return (
        <>
            <Metadata title={`All Products Admin`} />
            <ToastContainerBox /> 
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                <div className="productListContainer">
                    <h1 id="productListHeading">All Orders</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        disableColumnMenu
                        className="productListGrid"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList