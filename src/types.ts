import { AxiosPromise } from 'axios';
export interface Escort {
  id: string;
  title?: string;
  imageId?: string;
  imageUrl?: string;
  additionalImageIds?: string[];
  additionalImageUrls?: (string | undefined)[];
  age?: number;
  nationality?: string;
  orientation?: string;
  bodyType?: string;
  bust?: string;
  hair?: string;
  height?: string;
  language?: string;
  about?: string;
  notice?: string[];
  rates?: RatesData;
  incallPrice?: string;
  outcallPrice?: string;
  location?: LocationData;
  newTag?: boolean;
  recommendedTag?: boolean;
  updatedAt?: string;
  services?: string[];
}

export interface EscortIndexed {
  id: string;
  title: string;
  location: string;
  services: string[];
  hair: string;
  bodyType: string;
  bust: string;
  incallRate: number;
  outcallRate: number;
  imageUrl: string | undefined;
}

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
}

export interface EscortsData<T extends EscortData> {
  total?: number;
  skip?: number;
  limit?: number;
  items: T[];
  includes: {
    Asset: AssetIncludesData[];
  };
}

export interface AssetIncludesData {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url: string;
    };
  };
}

export interface EscortData {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    nationality: string;
    orientation: string;
    bodyType: string;
    age: number;
    hair: string;
    bust: string;
    height: string;
    language: string;
    notice: string;
    location: LocationData;
    services: string[];
    tags: string[];
    photos: AssetData[];
    photosAdditiona: AssetData[];
    about: string;
    rates: RatesData;
  };
}

export interface EscortDataModified extends EscortData {
  added: {
    imageUrl?: string;
  };
}

export interface AssetData {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export interface RatesData {
  eur: RatesPerTimeData;
  gbp: RatesPerTimeData;
  usd: RatesPerTimeData;
}

export interface RatesPerTimeData {
  '1_One hour': RatesPerPlaceData;
  '3_Two hours': RatesPerPlaceData;
  '6_Overnight': RatesPerPlaceData;
  '2_90 minutes': RatesPerPlaceData;
  '4_Three hours': RatesPerPlaceData;
  '5_Additional hour': RatesPerPlaceData;
}

export interface RatesPerPlaceData {
  incall: number;
  outcall: number;
}

export type ReqParams = { [k: string]: string | number | undefined };

export interface FilterReqParams {
  title: string;
  location: string;
  services: string;
  hair: string;
  bodyType: string;
  bust: string;
  incallRate: number;
}

export interface APIRequest<T> {
  (method: string, url: string, params: ReqParams): AxiosPromise<T>;
}

export interface EscortsFilterQuery {
  location: string[];
}
