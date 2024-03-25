import { ResItem } from "@/models/item";
import { ResponseEntity } from "@/utils/api";
import fs from "fs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Read the JSON file
    const data = await fs.promises.readFile("data/item.json", "utf8");

    // Parse the JSON data
    const items: ResItem[] = JSON.parse(data);
    const foundItem = items.find((item) => item.id === id);
    if (!foundItem) {
      return ResponseEntity.notFoundResponseEntity({
        error: "Not found.",
        message: "Item not found.",
      });
    }

    return ResponseEntity.getSuccessResponseEntity({
      res: foundItem,
    });
  } catch (error) {
    return ResponseEntity.serverErrorResponseEntity({ error });
  }
}
