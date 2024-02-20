<template>
    <div class="today-forecast">
        <p class="timestamp">Today: {{ data.timestamp }}</p>

        <div class="temp-block">
            <img :src="`/images/${data.icon}.png`" :alt="data.icon" />
            <h2 class="current-temperature">{{ data.currentTemp }}</h2>
        </div>
        <div class="additional-info">
            <div class="additional-info__wind">
                <span
                    class="additional-info__wind-direction"
                    :style="{
                        transform: `rotate(${data.windDeg}deg)`,
                    }"
                >
                    ^
                </span>
                <p>{{ data.windSpeed }}m/s</p>
            </div>
            <p>Humidity: {{ data.humidity }}%</p>
        </div>
        <p>{{ data.description }}</p>
    </div>
</template>

<script setup lang="ts">
import type { ITodayForecast } from "../utils/transformWeatherData";

interface IWeatherCardProps {
    data: ITodayForecast;
}

const { data } = defineProps<IWeatherCardProps>();
</script>

<style scoped>
.today-forecast {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.timestamp {
    font-size: 18px;
}
.temp-block {
    display: flex;
}
.temp-block img {
    width: 80px;
}
.current-temperature {
    font-size: 50px;
}
.additional-info {
    display: flex;
    align-items: center;
}
.additional-info > p {
    margin-left: 8px;
    margin-right: 8px;
}
.additional-info__wind {
    display: flex;
    align-items: center;
    margin-left: 8px;
    margin-right: 8px;
}
.additional-info__wind-direction {
    font-size: 30px;
    padding: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
