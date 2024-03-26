import { API_BASE_URL } from "@/constants/api";
import { ReqItem } from "@/models/item";

const create = async (payload: ReqItem) => {
  const formdata = new FormData();
  for (const key of Object.keys(payload) as (keyof ReqItem)[]) {
    formdata.append(key, payload[key]!);
  }
  const requestOptions = { method: "POST", body: formdata };
  const response = await fetch(`${API_BASE_URL}/items`, requestOptions);
  return await response.json();
};

const ItemService = {
  create,
};

export default ItemService;
