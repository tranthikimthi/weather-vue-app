<template>
  <div class="main">
    <Navigation class="navigation" />
    <router-view />
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

    const getCityWeather = () => {
      let firebaseDB = db.firestore().collection("cities");
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          console.log("doc: ", doc.doc.data());
          if (doc.type === "added") {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=imperial&appid=${APIKey.value}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  cities.value.push(doc.doc.data());
                })
                .then(() => {
                  console.log("cities: ", cities.value);
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
  .navigation {
    z-index: 99;
    position: fixed;
    max-width: 1024px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .container {
    padding: 0 20px;
  }
}
</style>
