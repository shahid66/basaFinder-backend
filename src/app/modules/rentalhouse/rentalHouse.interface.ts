export type IRentalHousePost = {
  name: string;
  location: string;
  details: string;
  rent_amount: number;
  nof_bedroom: number;

  category:
    | 'Apartment'
    | 'Condominium '
    | 'Single-Family Home'
    | 'Multi-Family Home'
    | 'Townhouse'
    | 'Duplex'
    | 'Triplex'
    | 'Bungalow '
    | 'Cottage'
    | 'Mansion'
    | 'Villa';

  images: string[];

  status: string;

  createdAt?: Date;
  updatedAt?: Date;
};
