<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIKey="APIKey" />
    <Navigation
      v-on:add-city="toggleModal"
      v-on:edit-cities="toggleEdit"
      v-on:reload-cities="getCityWeather"
    />
    <router-view :cities="cities" :edit="edit" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";
import db from "./firebase/firebase_init";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    Modal,
    Navigation,
  },
  setup() {
    const APIKey = ref("11ef1ee621be9e5e7a31ff6897a7dcaf");
    const cities = ref([]);
    const modalOpen = ref(null);
    const edit = ref(false);

    const getCityWeather = async () => {
      cities.value = [];
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
          } else if (doc.type === "removed") {
            cities.value = cities.value.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
        });
      });
    };

    onMounted(() => {
      getCityWeather();
    });

    const toggleModal = () => {
      modalOpen.value = !modalOpen.value;
    };

    const toggleEdit = () => {
      edit.value = !edit.value;
    };

    return {
      APIKey,
      cities,
      getCityWeather,
      modalOpen,
      toggleModal,
      edit,
      toggleEdit,
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
  background-color: #31363d;

  .container {
    padding: 0 20px;
  }
}
</style>
