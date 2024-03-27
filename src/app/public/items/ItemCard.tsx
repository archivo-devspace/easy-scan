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
import { useEffect, useState } from "react";
import QrScan from "@/components/QrScan";
import QRCode from "react-qr-code";
import { Box, Button } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  item: ResItem;
}

export default function ItemCard({ item }: Props) {
  const [isShowQr, setIsShowQr] = useState<boolean>(false);
  const pathname = usePathname()
  const [domain, setDomain] = useState("");
  const itemDetailsUrl = `${domain}${pathname}/${item.id}`;
  const openQrModal = () => setIsShowQr(true);

  useEffect(() => {
    typeof window !== 'undefined' && setDomain(window.location.origin)
  }, [])

  return (
    <>
      <QrScan item={item} itemDetailsUrl={itemDetailsUrl} isOpen={isShowQr} close={() => setIsShowQr(false)} />

      <Card variant="outlined" sx={{ width: "100%", paddingTop: 0 }}>
        <Link href={itemDetailsUrl}>
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
          <CardContent sx={{marginTop : "10px"}}>
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
        </Link>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button onClick={openQrModal}>QR Info</Button>
            </Box>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
              sx={{cursor: "pointer"}}
            >
              <QRCode
                style={{ width: "100px", height: "70px" }}
                value={itemDetailsUrl}
                onClick={openQrModal}
              />
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </>
  );
}
