<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="far fa-edit"></i>
        <i class="fas fa-sync"></i>
        <i class="fas fa-plus"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style lang="scss" scoped>
header {
  &.add-city {
    background-color: #313640;
  }

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
        font-size: 20px;
        &:not(:first-child) {
          margin-left: 16px;
        }
      }
    }
  }
}
</style>