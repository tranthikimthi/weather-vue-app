<template>
  <h4>weather</h4>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import db from "../firebase/firebase_init";
import { useRoute } from "vue-router";

export default {
  name: "Weather",
  props: {
    APIKey: String,
  },
  setup(props) {
    const route = useRoute();
    const forecast = ref(null);
    const currentWeather = reactive({});
    const loading = ref(true);

    const getWeather = () => {
      db.firestore()
        .collection("cities")
        .where("city", "==", route.params.city)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            currentWeather.value = doc.data().currentWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${
                  doc.data().currentWeather.coord.lat
                }&lon=${
                  doc.data().currentWeather.coord.lon
                }&exclude=current,minutley,alerts&units=imperial&appid=${
                  props.APIKey
                }`
              )
              .then((res) => {
                forecast.value = res.data;
              })
              .then(() => {
                loading.value = false;
                console.log("forecast.value: ", forecast.value);
                console.log("currentWeather.value: ", currentWeather.value);
              });
          });
        });
    };

    onMounted(() => {
      getWeather();
    });

    return { route, forecast, currentWeather, loading, getWeather };
  },
};
</script>

<style lang="scss" scoped>
h4 {
  padding-top: 100px;
}
</style>