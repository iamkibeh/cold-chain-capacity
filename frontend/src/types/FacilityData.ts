export interface Facility {
    County: string;
    "Sub.county": string;
    Ward: string;
    Facility_Name: string;
    latitude: string;
    longitude: string;
    capacity_in_litres: string;
   "DHIS.ID"?: string; // Optional properties
    Ownership?: string;
    Operational_Status?: string;
    Currently_Offering_EPI_Services?: string;
    Total_Catchment_Population_2023?: string;
    Live_Births_Population_2023?: string;
    Surviving_Infants_Population_2023?: string;
    KPLC_Electricity_Availability?: string;
    manufacturer?: string;
    make?: string;
    X_in_Service?: string;
    functional_or_not?: string;
    reason_for_non_functionality?: string;
    Corrective_Measures?: string;
    Available_Fridge_Tags?: string;
    Functional_Fridge_Tags?: string;
    Available_Voltage_Stabilizers?: string;
    Functional_Voltage_Stabilizers?: string;
    Available_Cold_Boxes?: string;
    Functional_Cold_Boxes?: string;
    Available_Vaccine_Carriers?: string;
    Functional_Vaccine_Carriers?: string;
    No_of_Staff_Trained_on_EPI?: string;
    Cadre_of_Staff_Trained?: string;
    Remarks?: string;
    code?: string;
}
