export interface Facility {
    Facility_Name: string;
    Children_under_1_population_monthly_target: string;
    "10 year old girls population - monthly target": string;
    Required_vaccine_capacity_each_month_in_litres: string;
    Total_Capacity: string;
    Unutilized_Functional_Capacity: string;
    County: string;
    "Sub.county": string;
    Ward: string;
    "DHIS.ID"?: string; // Optional fields
    Ownership?: string;
    Operational_Status?: string;
    Currently_Offering_EPI_Services?: string;
    Live_Births_Population_2023?: string;
    Surviving_Infants_Population_2023?: string;
    "KPLC.Electricity.Availability..More.than.8.hrs.day..Yes.No."?: string;
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
    latitude: string;
    longitude: string;
}