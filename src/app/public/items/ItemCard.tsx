"use client";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import { ResItem } from "@/models/item";
import Image from "next/image";
import { FILE_RESOURCE_BASE_URL } from "@/constants/file";
import { useState } from "react";
import QrScan from "@/components/QrScan";

interface Props {
  item: ResItem;
}

export default function ItemCard({ item }: Props) {
  const [qrImg, setQrImg] = useState<string | null>(null);
  return (
    <>
      <QrScan
        qrImg={qrImg}
        isOpen={qrImg !== null}
        close={() => setQrImg(null)}
      />

      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <Image
              src={`${FILE_RESOURCE_BASE_URL}${item.itemCoverImg}`}
              loading="lazy"
              layout="fill"
              alt="coverImg"
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{item.itemTitle}</Typography>
          <Typography
            level="body-sm"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.itemDesc}
          </Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Scan Me
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                border: 2,
                boxShadow: "1px 1px 3px",
              }}
            >
              <Image
                src={`${FILE_RESOURCE_BASE_URL}${item.itemCoverImg}`}
                loading="lazy"
                width={70}
                height={50}
                alt="coverImg"
                onClick={() => setQrImg(`${FILE_RESOURCE_BASE_URL}${item.itemCoverImg}`)}
              />
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </>
  );
}
