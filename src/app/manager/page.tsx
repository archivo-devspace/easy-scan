"use client";

import FormGroup from "@/components/FormGroup";
import InputFileUpload from "@/components/InputFileUpload";
import { ReqItem } from "@/models/item";
import { Box, Button, Grid, Input, Textarea } from "@mui/joy";
import React, { useState } from "react";

function Manager() {
  const [formInputs, setFormInputs] = useState<ReqItem>({
    itemTitle: "",
    itemDesc: "",
    coverImg: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e : ", e.target.name);
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFormInputs({
        ...formInputs,
        [e.target.name]: selectedFile,
      });
    }
  };

  const save = () => {

  }

  console.log("form : ", formInputs);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8} xsOffset={2}>
        <FormGroup>
          <Input
            placeholder="Item Title"
            value={formInputs.itemTitle}
            name="itemTitle"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Textarea
            minRows={6}
            placeholder="Item Description"
            value={formInputs.itemDesc}
            name="itemDesc"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <>
            <Box marginY={3}>
              Selected File : <b>{formInputs.coverImg?.name}</b>
            </Box>
            <InputFileUpload name="coverImg" handleChange={handleFileChange} />
          </>
        </FormGroup>
        <FormGroup>
          <Button onClick={save}>
            Save
            </Button>
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default Manager;
