import React from "react";
import { INode, IItemProp, IImageProp } from "../types/item";

export const formatItems = (items: INode[]): IItemProp[] =>
  items?.length
    ? items.map(
        ({
          node: {
            id: productId,
            images: { edges },
            title,
          },
        }) => ({
          productId,
          images: edges.map(({ node }) => ({
            ...node,
            productId,
            altText: node.altText || title,
            previewUrl: undefined,
            loading: false,
          })),
        })
      )
    : [];

export const updateItem = (
  item: Partial<IImageProp>,
  setState: React.Dispatch<React.SetStateAction<IImageProp[]>>
) =>
  setState((prev) =>
    prev.map((image) => (image.id === item.id ? { ...image, ...item } : image))
  );

export const selectAll = (items: IItemProp[]) =>
  items.reduce((accu: IImageProp[], { images }) => [...accu, ...images], []);

export const isSelected = (item: IImageProp, selectedItems: IImageProp[]) =>
  selectedItems.some(({ id }) => item.id === id);

export const isAllSelected = (
  items: IItemProp[],
  selectedItems: IImageProp[]
) =>
  items.length && selectedItems.length
    ? items.every(({ images }) =>
        images.every(({ id }) =>
          selectedItems.some(({ id: sId }) => sId === id)
        )
      )
    : false;

export const isAnyLoading = (items: IImageProp[]): boolean =>
  items.some(({ loading }) => loading);

export const isAnyPreview = (items: IImageProp[]): boolean =>
items.some(({ previewUrl }) => !!previewUrl);

export const getFilename = (url: string) => {
  // url.split(/[#?]/)[0].split("/").slice(-1)[0];
  const re = /([\w\d\-]{1,}).(jpeg|jpg|png|bmp)/;
  return url.match(re)?.[1] as string;
};

export const imgUrlToBlob = (url: string) =>
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => new Blob([blob], { type: "image/png" }));

export const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export const blobToFile = (blob: Blob, filename: string) => {
  return new File([blob], `${filename}.png`, { type: blob.type });
};

export const base64ToFile = (base64: string, filename: string) => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.png`, { type: mime });
};

// export const previousPageHandler = () =>
//   alert("Functionality yet to be available.");

// export const nextPageHandler = () =>
//   alert("Functionality yet to be available.");
