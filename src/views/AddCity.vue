<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" :key="index">
      <City :city="city" :edit="edit" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import City from "@/components/City.vue";

export default defineComponent({
  name: "AddCity",
  props: {
    cities: Array,
    edit: Boolean,
  },
  components: { City },
  setup() {
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
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
