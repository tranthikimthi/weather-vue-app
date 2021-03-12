<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" :key="index">
      <City />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import City from "@/components/City.vue";

export default defineComponent({
  name: "AddCity",
  props: ["cities"],
  components: { City },
  setup(props) {
    onMounted(() => {
      console.log("cities: ", props.cities);
    });

    return {};
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
