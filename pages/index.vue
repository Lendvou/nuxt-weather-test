<template>
    <div class="container">
        <Head>
            <Title>Forecast</Title>
        </Head>

        <input
            type="text"
            v-model="cityInput"
            placeholder="City name"
            @keyup.enter="refresh()"
        />

        <div v-if="error?.data" class="error-message">
            Error:
            {{ error.data.cod }} {{ error.data.message }}
        </div>
        <div v-else-if="transformedData">
            <h1 class="city-name">{{ transformedData.city }}</h1>

            <TodayForecast
                :data="transformedData.forecast.today"
                class="today-forecast"
            />

            <div class="forecast-days">
                <FutureForecastCard
                    v-for="(day, index) in transformedData.forecast.futureDays"
                    :key="day.timestamp"
                    :data="day"
                    class="forecast-days__item"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { transformForecastData } from "../utils/transformWeatherData";
import TodayForecast from "../components/TodayForecast.vue";
import FutureForecastCard from "../components/FutureForecastCard.vue";

type ErrorObj = {
    cod: string;
    message: string;
};
type FetchResult = {
    list: any[]; // long object with many unnecessary fields
    city: { name: string };
};

const cityInput = ref("Moscow");

const {
    data: weather,
    error,
    refresh,
} = await useAsyncData<FetchResult, ErrorObj>(
    "weather",
    () =>
        $fetch(`https://api.openweathermap.org/data/2.5/forecast`, {
            query: {
                q: cityInput.value,
                appid: "d7d0584939b4e0b8c11b8a755544426a",
                units: "imperial",
            },
        }),
    {
        pick: ["list", "city"],
    }
);

const transformedData = computed(() => {
    if (!weather.value) {
        return null;
    }
    return {
        city: weather.value.city.name,
        forecast: transformForecastData(weather.value.list),
    };
});
</script>

<style scoped>
.container {
    padding-top: 100px;
    margin: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
input {
    width: 300px;
    font-size: 20px;
    outline: none;
    padding: 4px 10px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 2px solid black;
    transition: 150ms;
}
input:focus {
    border-bottom-color: #009bd6;
}
.error-message {
    font-size: 40px;
    margin-top: 40px;
    color: #ee0000;
    font-weight: 500;
}
.city-name {
    text-align: center;
}
.today-forecast {
    margin-bottom: 30px;
}
.forecast-days {
    display: flex;
}
.forecast-days__item {
    margin-left: 8px;
    margin-right: 8px;
}
</style>
