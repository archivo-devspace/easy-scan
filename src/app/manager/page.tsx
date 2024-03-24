"use client";

import FormGroup from "@/components/FormGroup";
import InputFileUpload from "@/components/InputFileUpload";
import Required from "@/components/Required";
import { ReqItem } from "@/models/item";
import ItemService from "@/services/item";
import { Box, Button, Grid, Input, Textarea, Typography } from "@mui/joy";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Manager() {
  const [formInputs, setFormInputs] = useState<ReqItem>({
    itemTitle: "",
    itemDesc: "",
    itemCoverImg: null,
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

  const save = async () => {
    for (const key of Object.keys(formInputs) as (keyof ReqItem)[]) {
      if (!formInputs[key]) {
        toast.error("Fill required fields.");
        return;
      }
    }
    try {
      const res = await ItemService.create(formInputs);
      console.log("res ", res);
      toast(res.message);
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8} xsOffset={2}>
        <FormGroup>
          <Box>
            <Typography>Title : <Required /></Typography>
            <Input
              placeholder="Item Title"
              value={formInputs.itemTitle}
              name="itemTitle"
              onChange={handleChange}
            />
          </Box>
        </FormGroup>
        <FormGroup>
          <Box>
        <Typography>Description : <Required /></Typography>
          <Textarea
            minRows={6}
            placeholder="Item Description"
            value={formInputs.itemDesc}
            name="itemDesc"
            onChange={handleChange}
          />
          </Box>
        </FormGroup>
        <FormGroup>
          <>
            <Box marginY={3}>
            <Typography>Selected File : <Required /> <b>{formInputs.itemCoverImg?.name}</b></Typography>
            </Box>
            <InputFileUpload
              name="itemCoverImg"
              handleChange={handleFileChange}
            />
          </>
        </FormGroup>
        <FormGroup>
          <Button onClick={save}>Save</Button>
        </FormGroup>
      </Grid>
    </Grid>
  );
}

export default Manager;
