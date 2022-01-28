import gql from "graphql-tag";

export const PRODUCTS = gql`
	query {
		products(first: 50) {
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			edges {
				node {
					id
					title
					images(first: 10) {
						edges {
							node {
								altText
								src
								id
							}
						}
					}
				}
			}
		}
	}
`;

export const STAGED_UPLOADS_CREATE = gql`
  mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        resourceUrl
        url
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation productImageUpdate($image: ImageInput!, $productId: ID!) {
    productImageUpdate(image: $image, productId: $productId) {
      image {
        altText
        src
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
