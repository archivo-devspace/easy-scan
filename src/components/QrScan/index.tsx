"use client";
import React, { useRef } from "react";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import { ResItem } from "@/models/item";
import { Box, Button } from "@mui/joy";

interface Props {
  isOpen: boolean;
  close: any;
  itemDetailsUrl: string;
  item: ResItem;
}

function QrScan({ close, isOpen, itemDetailsUrl, item }: Props) {
  const divRef = useRef<any>(null);

  const downloadQr = async () => {
    const canvas = await html2canvas(divRef.current);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, `${item.itemTitle}-${item.id}.png`, "image/png");
  };

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
          maxWidth: { xs: 300, sm: 500 },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <Typography
          id="modal-desc"
          textColor="text.tertiary"
          sx={{ display: "flex", justifyContent: "center" }}
          ref={divRef}
        >
          <QRCode value={itemDetailsUrl} />
        </Typography>
        <Typography
          id="modal-title"
          textColor="inherit"
          mt={3}
          sx={{ textAlign: "center", wordBreak: "break-word" }}
        >
          {itemDetailsUrl}
        </Typography>
        <Box sx={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
          <Button onClick={downloadQr}>Download QR</Button>
        </Box>
      </Sheet>
    </Modal>
  );
}

export default QrScan;
