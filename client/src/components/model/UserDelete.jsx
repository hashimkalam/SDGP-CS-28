import { Button } from "@mui/material";
import { useState } from "react";

function UserDelete() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <Modal
      open={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal">
        <h2 id="modal-modal-title">Confirm Deletion</h2>
        <p id="modal-modal-description">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <Button onClick={() => setShowConfirmation(false)}>Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </Modal>
  );
}

export default UserDelete;
