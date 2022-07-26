import React from "react";

import MedicineSearch from "../MedicineSearch/MedicineSearch";

interface IProps {
  setResults: (results: any) => void;
}

export const MedicineSearchStep = ({ setResults }: IProps) => {
  return <MedicineSearch setResults={setResults} />;
};
