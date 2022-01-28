import React, { createContext, useState } from "react";
import { IProviderValues, IProviderProps, Actions } from "types/batch";
import { IImageProp } from "types/item";

const initialValues: IProviderValues = {
  selectedItems: [],
  setSelectedItems: () => {},
  action: Actions.NULL,
  setAction: () => {},
};

export const BatchContext = createContext(initialValues);

export const BatchProvider = ({ children }: IProviderProps) => {
  const [selectedItems, setSelectedItems] = useState<IImageProp[]>(
    initialValues.selectedItems
  );
  const [action, setAction] = useState<Actions>(initialValues.action);

  const values = {
    selectedItems,
    setSelectedItems,
    action,
    setAction,
  };

  return (
    <BatchContext.Provider value={values}>{children}</BatchContext.Provider>
  );
};
