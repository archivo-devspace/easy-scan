import React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  close: any;
  qrImg : string | null
}

function QrScan({ qrImg, close, isOpen }: Props) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={isOpen}
      onClose={close}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography id="modal-desc" textColor="text.tertiary">
          {qrImg && <Image src={qrImg} width={400} height={400} alt="qrImg" />}
        </Typography>
      </Sheet>
    </Modal>
  );
}

export default QrScan;
