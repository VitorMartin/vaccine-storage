import { VaccineModel } from "../models/vaccine_model";

export interface IStorage {
    addVacs(vaccines: VaccineModel[]): boolean;
    removeVacs(vaccines: VaccineModel[]): boolean; // Input qty to be removed inside each vaccine item of list
    countVac(vacName: string): VaccineModel;
    getAllVacs(): VaccineModel[];
}