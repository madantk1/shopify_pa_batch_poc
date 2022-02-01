export interface IEdge {
  node: {
    id: string;
    src: string;
    altText: string;
  };
}

export interface INode {
  node: {
    id: string;
    title: string;
    images: {
      edges: IEdge[];
    };
  };
}

export interface IImageProp {
  id: string;
  productId: string;
  src: string;
  altText: string;
  loading?: boolean;
  previewUrl?: string | undefined;
}

export interface IItemProp {
  productId: string;
  images: IImageProp[];
}

export interface IPageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type TImageRes = {
  id: string;
  src: string;
  altText: string;
};

export type TUpdateProductDetailsRes = {
  data: {
    productImageUpdate: {
      image: TImageRes;
      userErrors: any[];
    };
  };
};

export type TCreateStagedLocationRes = {
  data: {
    stagedUploadsCreate: {
      stagedTargets: {
        parameters: {
          name: string;
          value: string;
        }[];
        url: string;
      }[];
      userErrors: any[];
    };
  };
};
