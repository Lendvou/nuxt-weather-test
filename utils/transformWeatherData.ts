import { getMostFrequentOccurenceOfField } from "./getMostFrequentOccurenceOfField";

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
    futureForecast: IFutureDayForecast[];
}

export const transformForecastData = (list: any[]): ITransformedForecast => {
    // grouping by day
    const days: { [key: string]: any[] } = list.reduce((group, item) => {
        const day = item.dt_txt.split(" ")[0];
        group[day] = group[day] ?? [];
        group[day].push(item);

        return group;
    }, {} as { [key: string]: any[] });

    const currentDay: ITodayForecast = {
        currentTemp: toCelcius(list[0].main.temp),
        description: list[0].weather[0].description,
        icon: list[0].weather[0].icon,
        windSpeed: list[0].wind.speed,
        windDeg: list[0].wind.deg,
        humidity: list[0].main.humidity,
        timestamp: list[0].dt_txt.split(" ")[0],
    };

    const futureDays: IFutureDayForecast[] = Object.entries(days)
        .slice(1, 4)
        .map(([timestamp, day]: any) => ({
            timestamp,
            description: getMostFrequentOccurenceOfField(
                day.map((item: any) => item.weather[0].description)
            ),
            icon: getMostFrequentOccurenceOfField(
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
        today: currentDay,
        futureForecast: futureDays,
    };
};
