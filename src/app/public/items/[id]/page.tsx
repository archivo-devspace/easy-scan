import { API_BASE_URL } from "@/constants/api";
import { ResItem } from "@/models/item";
import { Grid } from "@mui/joy";
import React from "react";

const getItem = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/items/${id}`, {
      cache: "no-cache",
    });
    const {
      result,
    } = await res.json();
    return result;
  } catch (error) {
    console.log("Error : ", error);
  }
};

async function Item({ params }: { params: { id: string } }) {
  const { id } = params;
  const item: ResItem = await getItem(id);

  return (
    <Grid container>
      <Grid xs={12}>Title : {item.itemTitle}</Grid>
    </Grid>
  );
}

export default Item;
