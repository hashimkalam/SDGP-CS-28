import React from "react";

import { Modal, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../../redux/user/userSlice";
import { useSnackbar } from "notistack";

const NameEdit = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser?.user?.name;
  const email = currentUser?.user?.email;

  const [open, setOpen] = useState(false);
  const [edittedName, setEdittedName] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
  };

  // updatig name details

  const updateUserName = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/usernames");
      const data = await response.json();

      const users = data.users;
      console.log(users);

      const isNameExisting = users.some((user) => user.name === edittedName);
      console.log("Is name existing:", isNameExisting);

      if (isNameExisting) {
        enqueueSnackbar("Username already exists", { variant: "warning" });
        return;
      } else if (edittedName === name) {
        enqueueSnackbar("No changes made", { variant: "warning" });
        return;
      } else if (edittedName === "") {
        enqueueSnackbar("Username cannot be empty", { variant: "warning" });
        return;
      } else if (edittedName.length < 3) {
        enqueueSnackbar("Username must be atleast 3 characters long", {
          variant: "warning",
        });
        return;
      } else if (edittedName.includes(" ")) {
        enqueueSnackbar("Username should not contain spaces", {
          variant: "warning",
        });
        return;
      }
    } catch (error) {
      console.error(error.message);
      enqueueSnackbar("Cannot update Now Sorry", { variant: "warning" });
      return;
    }

    console.log("Updating username", edittedName);
    try {
      const res = await fetch("http://localhost:3000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: edittedName,
        }),
      });

      if (res.ok) {
        dispatch(updateUserDetails({ name: edittedName }));

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
      <button
        onClick={handleOpen}
        className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out"
      >
        Edit Username
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
          <h1 className="mt-0 font-semibold">Edit Username</h1>

          <form
            onSubmit={updateUserName}
            className="flex flex-col space-y-2 m-5 "
          >
            <input
              type="text"
              placeholder="New Username"
              className="p-2 border-black border-2 rounded-lg hover:bg-gray-300 duration-200 ease-in-out"
              onChange={(e) => {
                console.log(e.target.value);
                setEdittedName(e.target.value);
              }}
            />
          </form>

          <div
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex justify-evenly space-x-2"
          >
            <button
              className="p-1 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white duration-200 ease-in-out flex-[.5]"
              onClick={updateUserName}
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
        </Box>
      </Modal>
    </>
  );
};

export default NameEdit;
