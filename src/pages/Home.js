import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, deleteUser } from "../redux/action";
import { useHistory } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    // root: {
    //     '&:nth-of-type(odd)': {
    //         backgroundColor: theme.palette.action.hover,
    //     },
    // },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
        marginTop: 100,
    },
});

const Home = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    const { users } = useSelector((state) => state.data);
    console.log(users);

    const deleteUserData = (id) => {
        console.log(id);
        if (window.confirm("Are you sure  wanted  to delete  the user?")) {
            dispatch(deleteUser(id));
        }
    };
    const history = useHistory();

    const EditUserData = (data) => {
        console.log(data);
        history.push(`/editUser/${data.id}`);
    };

    return (
        <div>
            <div align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/addUser")}
                >
                    Add user
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name </StyledTableCell>
                            <StyledTableCell align="center">E-mail</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address </StyledTableCell>
                            <StyledTableCell align="center"> Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users &&
                            users.map((userData) => (
                                <StyledTableRow key={userData.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {userData.name}
                                    </StyledTableCell>

                                    <StyledTableCell align="center">{userData.email}</StyledTableCell>
                                    <StyledTableCell align="center">{userData.contact}</StyledTableCell>
                                    <StyledTableCell align="center">{userData.address}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            style={{ marginRight: "5px" }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                EditUserData(userData)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => deleteUserData(userData.id)}
                                        >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Home;
