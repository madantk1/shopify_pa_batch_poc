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
            loading: false,
          })),
        })
      )
    : [];

export const updateSelectedImage = (
  images: IImageProp[],
  selectedImage: Partial<IImageProp>
) =>
  images.map((image) =>
    image.id === selectedImage.id ? { ...image, ...selectedImage } : image
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

export const getFilename = (url: string) =>
  url.split(/[#?]/)[0].split("/").slice(-1)[0];

export const imgUrlToFile = (url: string, filename: string) =>
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => new Blob([blob], { type: "image/png" }))
    .then((blob) => new File([blob], filename, { type: blob.type }));

// export const previousPageHandler = () =>
//   alert("Functionality yet to be available.");

// export const nextPageHandler = () =>
//   alert("Functionality yet to be available.");
