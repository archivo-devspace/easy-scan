import { ResponseEntity } from "@/utils/api";
import { getUniqueFileName } from "@/utils/file";
import fs from "fs";
import { writeFile } from "fs/promises";
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
    return ResponseEntity.badRequestResponseEntity({message : "No files received."})
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = getUniqueFileName(file.name.replaceAll(" ", "_"));

  try {
    await writeFile(
      path.join(process.cwd(), "storage/uploads/" + filename),
      buffer
    );
    payload.itemCoverImg = filename;

    // Read existing JSON data from file
    fs.readFile("data/item.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let existingData: any[] = [];

      try {
        existingData = data ? JSON.parse(data) : [];
      } catch (parseError) {
        console.error("Error parsing JSON data:", parseError);
        return;
      }

      if (!Array.isArray(existingData)) {
        console.error("Existing data is not an array");
        return;
      }

      // Append new data to the existing array
      existingData.push(payload);

      // Convert updated JavaScript object back to JSON string
      const updatedJsonString = JSON.stringify(existingData, null, 2); // Using null and 2 for pretty formatting

      // Write updated JSON string back to the file
      fs.writeFile("data/item.json", updatedJsonString, (writeErr) => {
        if (writeErr) {
          console.error("Error writing to file:", writeErr);
          return;
        }
        console.log("New data has been appended to the file");
      });
    });

    return ResponseEntity.createSuccessResponseEntity({
      res : "item"
    })
  } catch (error) {
    console.log("Error occured ", error);
    return ResponseEntity.serverErrorResponseEntity({})
  }
}
