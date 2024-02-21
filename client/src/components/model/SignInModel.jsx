import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedOption,
  setSelectedOption,
} from "../../redux/user/userSlice";

function SignInModel({ handleClose }) {
  const [modalOpen, setModalOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedOption = useSelector(selectSelectedOption);

  const handleCloseModal = () => {
    setModalOpen(false);
    handleClose();
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute text-center w-[400px] rounded-xl p-8 shadow-2xl bg-white/90 hover:bg-white duration-150 ease-out top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <Typography
          id="modal-modal-title"
          style={{ fontSize: "24px", fontWeight: "600" }}
        >
          Select Role
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span
            className={`cursor-pointer py-2 block w-full rounded-lg ${
              selectedOption === "Individual"
                ? "bg-black text-white"
                : "bg-[#F0EDFF] hover:bg-[#bbb0f0] duration-150 ease-in-out"
            }`}
            onClick={() => dispatch(setSelectedOption("individual"))}
          >
            Individual
          </span>
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span
            className={`cursor-pointer py-2 block w-full rounded-lg ${
              selectedOption === "Architect"
                ? "bg-black text-white"
                : "bg-[#F0EDFF] hover:bg-[#bbb0f0] duration-150 ease-in-out"
            }`}
            onClick={() => dispatch(setSelectedOption("architect"))}
          >
            Architect
          </span>
        </Typography>
      </Box>
    </Modal>
  );
}

export default SignInModel;