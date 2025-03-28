import axios from "axios";

const api = axios.create({
  baseURL: "https://api.weather.gov",
});

export async function getAlerts(state: string | undefined, regions: string[]) {
  try {
    console.log("State provided", state);
    const { data } = await api.get("/alerts/active", {
      params: {
        area: state,
      },
    });
    if (regions.length) {
      const alerts = data.features;
      const filtered = alerts.filter((alert: { properties: { areaDesc: string } }) =>
        regions.every((region) => alert.properties.areaDesc.includes(region)),
      );
      return {
        "@context": data["@context"],
        features: filtered,
        title: data.title,
        type: data.type,
        updated: data.updated,
      };
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
}
