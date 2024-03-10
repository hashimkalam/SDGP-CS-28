import React from 'react'

import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateUserDetails } from "../../redux/user/userSlice";
import { useSnackbar } from "notistack";


const PasswordEdit = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const name = currentUser?.user?.name;
    const profilePic = currentUser?.user?.profilePicture;
    const email = currentUser?.user?.email;
    const password = currentUser?.user?.password;
    const userID = currentUser?.user?._id;

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [edittedPassword, setEdittedPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid #000",
    };

    const updateUserPassword = async () => {

        if (edittedPassword !== confirmPassword) {
            enqueueSnackbar("Passwords do not match", { variant: "warning" });
            return
        }

        if (edittedPassword === "" || confirmPassword === "") {
            enqueueSnackbar("Password cannot be empty", { variant: "warning" });
            return  
        }

        if (edittedPassword.length < 8) {
            enqueueSnackbar("Password must be atleast 8 characters long", { variant: "warning" });
            return
        }

        const hasNumber = /\d/;
        if (!hasNumber.test(edittedPassword)) {
            enqueueSnackbar("Password must contain numbers", { variant: "warning" });
            return;
        }

        try {
          const res = await fetch(
            "http://localhost:3000/api/password/resetpassword",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                newPassword: edittedPassword,
              }),
            }
          );
    
          if (res.ok) {
            dispatch(
              updateUserDetails({ password: edittedPassword, name: name })
            );
    
            enqueueSnackbar("Account details updated successfully", {
              variant: "success",
            });
    
            setOpen(false);
          } else {
            enqueueSnackbar("Failed to update details", { variant: "error" });
          }
        } catch (error) {
          console.log("Error in updating details: ", error);
        }
      };

    return (
        <>
            <button onClick={handleOpen} className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out">
                Edit PassWord
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="bg-[#090E34]/50"
            >
                <Box
                    sx={style}
                    className="rounded-xl bg-white/90 absolute p-4 shadow-2xl w-[45vw] text-center"
                >
                    <h1 className="mt-0 font-semibold">Edit Password</h1>

                    <div className="flex flex-col space-y-2 m-5 ">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out" 
                            onChange={(e) => {
                                console.log(e.target.value);
                                setEdittedPassword(e.target.value);
                            }
                            }
                            />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out"
                            
                            onChange={(e) => {
                                console.log(e.target.value);
                                setconfirmPassword(e.target.value);
                                }}
                                />

                    </div>

                    <div
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        className="flex justify-evenly space-x-2"
                    >

                        <button
                            className="p-1 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white duration-200 ease-in-out flex-[.5]"
                            onClick={updateUserPassword}
                        >
                            Apply Changes
                        </button>
                        <button
                            className="p-1 bg-red-400 hover:bg-red-600 hover:font-bold hover:text-white duration-200 ease-in-out flex-[.5]"
                            onClick={() => setOpen(false)}
                        >
                            Back
                        </button>
                    </div>
                </Box >
            </Modal >
        </>
    );
}


export default PasswordEdit;
