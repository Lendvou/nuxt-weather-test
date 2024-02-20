<template>
    <div class="card-container">
        <h3 class="card-container__timestamp">
            {{ data.timestamp }}
        </h3>

        <div class="card-container__temp-info">
            <h3>
                {{ data.minTemp }} /
                {{ data.maxTemp }}
            </h3>
            <img
                :src="`/images/${data.icon}.png`"
                :alt="data.icon"
                class="card-container__icon"
            />
        </div>
        <p>{{ data.description }}</p>
    </div>
</template>

<script setup lang="ts">
import type { IFutureDayForecast } from "../utils/transformWeatherData";

interface IFutureForecastCardProps {
    data: IFutureDayForecast;
}

const { data } = defineProps<IFutureForecastCardProps>();
</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #009bd6;
    border-radius: 6px;
    padding: 16px;
    color: white;
    transition: 150ms;
    min-width: 210px;
}
.card-container__timestamp {
    font-size: 16px;
}
.card-container__temp-info {
    display: flex;
    align-items: center;
}
.card-container__icon {
    width: 80px;
}
</style>
