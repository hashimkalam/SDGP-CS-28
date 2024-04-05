import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";

function Disclaimer() {
  const [open, setOpen] = useState(true);

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="bg-[#090E34]/50"
      >
        <Box
          sx={style}
          className="rounded-xl bg-white/90 absolute p-4 shadow-2xl px-8 w-[50vw] md:w-[40vw] lg:w-[30vw] text-center"
        >
          <h1 className="mt-0 font-semibold text-lg md:text-2xl lg:text-3xl mb-5">
            Work in Progress
          </h1>

          <p>
            Thank you for visiting EliteBluPrint. Please note that this site is
            currently under development and is not the final version. We are
            continuously working to enhance and improve your experience. Stay
            tuned for updates as we add more features and content. Your patience
            and understanding are greatly appreciated.
          </p>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex items-center justify-center"
          >
            <button
              className="p-2 text-sm md:text-md bg-[#004ec3]/90 hover:bg-[#004ec3] font-semibold text-white duration-200 ease-in-out w-full"
              onClick={() => setOpen(false)}
            >
              Got It!
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default Disclaimer;
