<template>
  <header class="container">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="far fa-edit"></i>
        <i @click="reload" class="fas fa-sync"></i>
        <i @click="addCity" class="fas fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  setup(props, { emit }) {
    const addCity = () => {
      emit("add-city");
    };

    const reload = () => {
      location.reload();
    };

    return { addCity, reload };
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #313640;

  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;

    span {
      font-weight: 600;
    }

    .right {
      i {
        cursor: pointer;
        font-size: 20px;
        &:not(:first-child) {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>