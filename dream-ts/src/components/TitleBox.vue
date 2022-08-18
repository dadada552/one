<template>
  <div class="tab-page">
    <header>
      <p class="title">
        <span class="streamer" :style="`border-color: ${borderColor};`"></span>
        <span>{{ title }}</span>
      </p>
    </header>
  </div>
</template>

<script>
export default {
  name: "TitleBox",
  props: ["borderColor", "title"],
};
</script>

<style scoped lang="scss">
.tab-page {
  margin-bottom: 20px;
  header {
    padding: 15px;
    height: 20px;
    box-shadow: 0 2px 12px #ddd;
    .title {
      height: 20px;
      line-height: 20px;
      .streamer {
        margin-right: 10px;
        border-style: solid;
        border-width: 0 2px;
      }
    }
  }
}
</style>
