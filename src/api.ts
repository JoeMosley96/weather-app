import axios from "axios";
import { dynamicSort } from "./utils.ts";

const api = axios.create({
  baseURL: "https://api.weather.gov",
});

import {Alert} from "./types.ts";

type AlertsData = {
  "@context": unknown;
  features: Alert[];
  title: string;
  type: string;
  updated: string;
};

export async function getAlerts(state: string | undefined, regions: string[]): Promise<AlertsData | undefined> {
  try {
    const { data } = await api.get<AlertsData>("/alerts/active", { params: { area: state } });

    if (regions.length) {
      data.features = data.features.filter(alert =>
          regions.every(region =>
              typeof alert.properties.areaDesc === "string" && alert.properties.areaDesc.includes(region)
          )
      );
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}

export function sortAlerts(
    data: AlertsData | undefined,
    sortCategory: string,
    isDescending: boolean
): AlertsData | undefined {
  if (!data) return;
  const severityLookup: Record<string, number> = { Unknown: 0, Minor: 1, Moderate: 2, Severe: 3, Extreme: 4 };
  const alerts = data.features;

  if (sortCategory === "Severity") {
    alerts.forEach(alert => {
      alert.properties.Severity = severityLookup[alert.properties.severity] || 0;
    });
  }

  const sortedAlerts = alerts.sort(dynamicSort(sortCategory === "Severity" ? "Severity" : "effective", isDescending));

  return { ...data, features: sortedAlerts };
}
