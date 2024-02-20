import { getMostFrequentOccurenceInArray } from "./getMostFrequentOccurenceInArray";

const toCelcius = (farenheit: number) => Math.round(((farenheit - 32) * 5) / 9);

export interface ITodayForecast {
    currentTemp: number;
    icon: string;
    timestamp: number;
    description: string;
    windSpeed: number;
    windDeg: number;
    humidity: number;
}
export interface IFutureDayForecast {
    minTemp: number;
    maxTemp: number;
    icon: string;
    timestamp: number;
    description: string;
}

export interface ITransformedForecast {
    today: ITodayForecast;
    futureDays: IFutureDayForecast[];
}

export const transformForecastData = (list: any[]): ITransformedForecast => {
    // grouping by day
    const days: { [key: string]: any[] } = list.reduce((group, item) => {
        const day = item.dt_txt.split(" ")[0];
        group[day] = group[day] ?? [];
        group[day].push(item);

        return group;
    }, {} as { [key: string]: any[] });

    const firstItem = list[0];
    const today: ITodayForecast = {
        currentTemp: toCelcius(firstItem.main.temp),
        description: firstItem.weather[0].description,
        icon: firstItem.weather[0].icon,
        windSpeed: firstItem.wind.speed,
        windDeg: firstItem.wind.deg,
        humidity: firstItem.main.humidity,
        timestamp: firstItem.dt_txt.split(" ")[0],
    };

    const futureDays: IFutureDayForecast[] = Object.entries(days)
        .slice(1, 4)
        .map(([timestamp, day]: any) => ({
            timestamp,
            description: getMostFrequentOccurenceInArray(
                day.map((item: any) => item.weather[0].description)
            ),
            icon: getMostFrequentOccurenceInArray(
                day.map((item: any) => item.weather[0].icon)
            ),
            maxTemp: toCelcius(
                Math.max(...day.map((item: any) => item.main.temp_min))
            ),
            minTemp: toCelcius(
                Math.min(...day.map((item: any) => item.main.temp_max))
            ),
        }));

    return {
        today,
        futureDays,
    };
};
