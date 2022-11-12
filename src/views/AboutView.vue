<template>
  <div class="about" >
    <h1 class="bg-$test">This is an about page</h1>
    <ChatBot />
  </div>
</template>

<script>
import ChatBot from "@/components/ChatBot.vue"

  export default {
      components: {
        ChatBot
      }
  }
</script>

<style lang="scss" scoped>
  .about {
    background-color: $test;
  }
</style>

