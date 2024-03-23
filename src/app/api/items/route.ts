import fs from "fs";

export async function POST(req: Request) {
  const payload = await req.json();

  // Read existing JSON data from file
  fs.readFile("src/data/item.json", "utf8", (err, data) => {
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
    fs.writeFile("src/data/item.json", updatedJsonString, (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
        return;
      }
      console.log("New data has been appended to the file");
    });
  });

  return Response.json("Ok");
}
