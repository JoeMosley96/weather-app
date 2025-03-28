export type Alert = { properties: { [key: string]: unknown; severity: string; }; id?: string }

export type AlertWithSeverity = { properties: { [key: string]: unknown; severity: string; Severity: string}; id?: string }

export type Filters  = {
    state: string
    regions: string[] | [];
}

export type SortValue = {
    sortBy: string;
    isDescending: boolean
}
