import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.weather.gov',
});

export async function getAlerts(state: string){
    const {data} = await api.get(`/alerts/active?area=${state}`);
    return data
}