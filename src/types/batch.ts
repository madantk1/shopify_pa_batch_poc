import React from "react";
import { IImageProp } from "./item";

export enum Actions {
  NULL = "No action",
  UPSCALE = "Upscale",
  EDIT_BACKGROUND = "Edit Background",
  RESIZE = "Resize",
  CROP = "Crop",
  WATERMARK_CREATOR = "Watermark Creator",
}

export interface IProviderValues {
  selectedItems: IImageProp[];
  setSelectedItems: React.Dispatch<React.SetStateAction<IImageProp[]>>;
  action: Actions;
  setAction: React.Dispatch<React.SetStateAction<Actions>>;
}

export interface IProviderProps {
  children: React.ReactChild;
}
