// src/types/index.ts
export type Pokemon = {
  name: string;
  number: number;
  image: string;
  types: string[];
  region: string;
  stats: {
    name: string;
    value: number;
  }[];
};