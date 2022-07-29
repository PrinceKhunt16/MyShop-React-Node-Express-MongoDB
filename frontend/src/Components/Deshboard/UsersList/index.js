import React, { useEffect } from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../Sidebar"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearErrors, deleteUser, getAllUsers } from '../../../Redux/action/userAction';
import { DELETE_USER_RESET } from '../../../Redux/constant/userConstant';
import Metadata from '../../Layouts/MetaData';

const UsersList = ({ history }) => {
    const dispatch = useDispatch();

    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            sortable: false,
            minWidth: 250,
            flex: 0.8,
        },
        {
            field: "email",
            headerName: "Email",
            sortable: false,
            minWidth: 280,
            flex: 0.8,
        }, 
        {
            field: "name", 
            headerName: "Name",
            type: "string",
            sortable: false, 
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Role",
            type: "string",
            sortable: false,
            minWidth: 120,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "actions",
            flex: 0.4,
            headerName: "Edit & Delete",
            minWidth: 150, 
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <ModeEditIcon />
                        </Link>
                        <Button id="deleteIconDeshboard" onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (deleteError) {
            dispatch(clearErrors());
        }

        if (isDeleted) {
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());

    }, [dispatch, error, history, deleteError, isDeleted]);

    return (
        <>
            <Metadata title={`All Users Admin`} />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                <div className="productListContainer">
                    <h1 id="productListHeading">All Users</h1>
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

export default UsersList