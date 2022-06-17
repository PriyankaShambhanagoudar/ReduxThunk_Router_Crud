import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/action";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch",
        },
    },
}));

const defaultData = {
    name: "",
    email: "",
    contact: "",
    address: "",
};

const AddUser = () => {
    const classes = useStyles();
    const [state, setstate] = useState(defaultData);
    const { name, email, contact, address } = state;

    let dispatch = useDispatch();
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setstate({
            ...state,
            [name]: value
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setstate(defaultData);
        console.log(state);
        history.push("/");
        dispatch(addUser(state));
    };
    return (
        //align="center"
        <div>
            <div align="center">
                <Button
                    style={{ width: "100px", marginTop: "20px" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push("/")}
                >
                    Go back
                </Button>
            </div>


            <h1 align="center">Add User</h1>

            <form
                align="center"
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}

            >
                <TextField
                    id="standard-basic"
                    label="name"
                    value={name}
                    name="name"
                    type="text"
                    onChange={handleChange}
                />
                <br />
                <TextField
                    id="standard-basic"
                    label="email"
                    value={email}
                    type="email"
                    name="email"
                    onChange={handleChange}
                />
                <br />
                <TextField
                    id="standard-basic"
                    label="contact"
                    value={contact}
                    type="number"
                    name="contact"
                    onChange={handleChange}
                />
                <br />
                <TextField
                    id="standard-basic"
                    label="address"
                    value={address}
                    type="text"
                    name="address"
                    onChange={handleChange}
                />
                <br />
                <Button
                    disabled={!name || !email || !contact || !address}
                    style={{ width: "365px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddUser;
