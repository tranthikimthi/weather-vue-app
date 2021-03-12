<template>
  <div class="main">
    <Navigation />
    <router-view :cities="cities" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Navigation from "./components/Navigation.vue";
import db from "./firebase/firebase_init";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    Navigation,
  },
  setup() {
    const APIKey = ref("11ef1ee621be9e5e7a31ff6897a7dcaf");
    const cities = ref([]);

    const getCityWeather = async () => {
      let firebaseDB = db.firestore().collection("cities");
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&appid=${APIKey.value}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  cities.value.push(doc.doc.data());
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
    };

    onMounted(() => {
      getCityWeather();
    });

    return {
      APIKey,
      cities,
      getCityWeather,
    };
  },
});
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.main {
  height: 100vh;
  margin: 0 auto;
  max-width: 1024px;

  .container {
    padding: 0 20px;
  }
}
</style>
