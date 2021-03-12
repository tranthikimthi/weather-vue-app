<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modalWrap">
      <label for="city-name">Enter location:</label>
      <input
        type="text"
        name="city-name"
        placeholder="Search By City Name"
        v-model="city"
      />
      <div style="text-align: right">
        <button @click="addCity">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import db from "../firebase/firebase_init";

export default {
  name: "modal",
  props: {
    APIKey: String,
  },
  setup(props, { emit }) {
    const modal = ref(null);
    const modalWrap = ref(null);
    const city = ref("");

    const closeModal = (e) => {
      if (e.target === modal.value) {
        emit("close-modal");
      }
    };

    const addCity = async () => {
      if (!city.value) {
        alert("Field cannot be empty");
      } else {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${props.APIKey}`
          )
          .then(async (res) => {
            const data = await res.data;
            db.firestore()
              .collection("cities")
              .doc()
              .set({
                city: city.value,
                currentWeather: data,
              })
              .then(() => {
                emit("close-modal");
              });
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    };

    return {
      modal,
      modalWrap,
      city,
      closeModal,
      addCity,
    };
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    color: #fff;
  }
  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      outline: none;
      cursor: pointer;
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>