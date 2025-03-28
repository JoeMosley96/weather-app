export type Alert = { id: string; properties: { event: string; severity: string; areaDesc: string; effective: string; ends: string } }

export type Filters  = {
    time: string | null;
    state: string
    regions: string[] | [];
}
