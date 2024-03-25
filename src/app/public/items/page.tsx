import React from "react";
import ItemCard from "./ItemCard";
import { API_BASE_URL } from "@/constants/api";
import { ResItem } from "@/models/item";
import { Grid } from "@mui/joy";

const getItems = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/items`, {
      cache : "no-cache"
    });
    const {
      result: { items },
    } = await res.json();
    return items;
  } catch (error) {
    console.log("Error : ", error);
  }
};

async function Items() {
  const items: ResItem[] = await getItems();
  console.log("items : ", items);
  return (
    <Grid container spacing={3} padding={2}>
      {items.map((item) => (
        <Grid key={item.id} xs={12} sm={12} md={3}>
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Items;
