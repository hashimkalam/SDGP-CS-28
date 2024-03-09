import { Button, Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PictureEdit = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const name = currentUser?.user?.name;
    const profilePic = currentUser?.user?.profilePicture;
    const email = currentUser?.user?.email;
    const password = currentUser?.user?.password;
    const userID = currentUser?.user?._id;


    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid #000",
    };

    return (
        <>
            <button onClick={handleOpen} className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out">
                Edit Profile Picture
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
                    <h1 className="mt-0 font-semibold">Edit profile picture</h1>

                    <div className="flex flex-col space-y-2 m-5 ">
                        d
                 

                    </div>

                    <div
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        className="flex justify-evenly space-x-2"
                    >
                        <button
                            className="p-1 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white duration-200 ease-in-out flex-[.5]"

                        >
                            Yes
                        </button>
                        <button
                            className="p-1 bg-red-400 hover:bg-red-600 hover:font-bold hover:text-white duration-200 ease-in-out flex-[.5]"
                            onClick={() => setOpen(false)}
                        >
                            Back
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default PictureEdit;
