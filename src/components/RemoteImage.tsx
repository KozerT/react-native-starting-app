import { Image } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { transform } from "@babel/core";

type RemoteImageProps = {
  path: string | null | undefined;
  fallback?: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!path) return;

    (async () => {
      setImage(fallback || "");
      const { data, error } = await supabase.storage
        .from("product-images")
        .download(path);

      if (error) {
        console.error("Error downloading image: ", error.message);
        return;
      }

      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
    })();
  }, [path, fallback]);

  return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
