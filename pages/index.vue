<template>
    <div class="container">
        <input
            type="text"
            v-model="city"
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
                :data="transformedData.transformedForecast.today"
                class="today-forecast"
            />

            <div class="forecast-days">
                <WeatherCardMini
                    v-for="(day, index) in transformedData.transformedForecast
                        .futureForecast"
                    :key="day.timestamp"
                    :data="day"
                    class="forecast-days__item"
                    @click="selectedDay = index"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { transformForecastData } from "../utils/transformWeatherData";
import TodayForecast from "../components/TodayForecast.vue";
import WeatherCardMini from "../components/WeatherCardMini.vue";

type ErrorObj = {
    cod: string;
    message: string;
};
type FetchResult = {
    list: any[]; // long object with many unnecessary fields
    city: { name: string };
};

const city = ref("Oslo");
const selectedDay = ref(0);

const {
    data: weather,
    error,
    refresh,
} = await useAsyncData<FetchResult, ErrorObj>(
    "weather",
    () =>
        $fetch(`https://api.openweathermap.org/data/2.5/forecast`, {
            query: {
                q: city.value,
                appid: "d7d0584939b4e0b8c11b8a755544426a",
                units: "imperial",
            },
        }),
    { pick: ["list", "city"] }
);

const transformedData = computed(() => {
    if (!weather.value) {
        return null;
    }
    return {
        city: weather.value.city.name,
        transformedForecast: transformForecastData(weather.value.list),
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
    padding: 10px;
    width: 300px;
    font-size: 20px;
    border-radius: 10px;
    outline: none;
    border: 2px solid black;
    margin-bottom: 30px;
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
