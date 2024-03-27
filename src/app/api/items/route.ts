import { ResItem } from "@/models/item";
import { ResponseEntity } from "@/utils/api";
import DataUtils from "@/utils/data";
import FileUtils from "@/utils/file";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const payload = {
    itemTitle: formData.get("itemTitle"),
    itemDesc: formData.get("itemDesc"),
    itemCoverImg: "",
  };

  const file: any = formData.get("itemCoverImg");
  if (!file) {
    return ResponseEntity.badRequestResponseEntity({
      error: "No files",
      message: "No files received.",
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = FileUtils.getUniqueFileName(file.name.replaceAll(" ", "_"));

  try {
    await fs.promises.writeFile(
      path.join(process.cwd(), "public/storage/uploads/" + filename),
      buffer
    );
    payload.itemCoverImg = filename;

    const data = await fs.promises.readFile("data/item.json", "utf8");

    let existingData: any[] = [];

    try {
      existingData = data ? JSON.parse(data) : [];
    } catch (parseError) {
      throw parseError;
    }

    if (!Array.isArray(existingData)) {
      throw new Error("Existing data is not an array");
    }

    // Append new data to the existing array
    const newItem = {
      id: DataUtils.getUniqueId(),
      ...payload,
    };
    existingData.push(newItem);

    // Convert updated JavaScript object back to JSON string
    const updatedJsonString = JSON.stringify(existingData, null, 2); // Using null and 2 for pretty formatting

    // Write updated JSON string back to the file
    await fs.promises.writeFile("data/item.json", updatedJsonString);

    return ResponseEntity.createSuccessResponseEntity({
      res: newItem,
    });
  } catch (error) {
    return ResponseEntity.serverErrorResponseEntity({ error });
  }
}

export async function GET( request: Request) {
  try {
    console.log("process.cwd", path.join(process.cwd(), "data/item.json"))
    // Read the JSON file
    const data = await fs.promises.readFile(path.join(process.cwd(), "data/item.json"), "utf8");

    // Parse the JSON data
    const items: ResItem[] = JSON.parse(data);

    return ResponseEntity.getSuccessResponseEntity({
      res: {
        items: items,
      },
    });
  } catch (error) {
    return ResponseEntity.serverErrorResponseEntity({ error });
  }
}
