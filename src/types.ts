export type Alert = {
  properties: { [key: string]: unknown; event: string, severity: string, areaDesc: string, effective: string, ends: string; Severity?: string};
  id?: string;
};

export type AlertsData = {
  "@context": unknown;
  features: Alert[];
  title: string;
  type: string;
  updated: string;
};

export type Filters = {
  state: string;
  regions: string[] | [];
};

export type SortValue = {
  sortBy: string;
  isDescending: boolean;
};
