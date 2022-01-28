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
}

export interface IItemProp {
  productId: string;
  images: IImageProp[];
}

export interface IPageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type TUpdateProductDetailsRes = {
  data: {
    productImageUpdate: {
      image: {
        id: string;
        src: string;
        altText: string;
      };
      userErrors: [];
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
      userErrors: [];
    };
  };
};
