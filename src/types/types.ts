export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    dob: string,
    isActive?: boolean,
}

export type ISortedWithLettersList = ISortedWithLettersItem[];

export interface ISortedWithLettersItem {
    title: string,
    employees: IEmployee[],
}