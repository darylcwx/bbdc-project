<template>
  <q-card bordered style="border-radius: 10px; height: 100%">
    <q-img :src="require(`@/assets/${pic}`)" />
    <q-card-section class="title q-pb-none">{{ name }}</q-card-section>
    <q-card-section class="role q-py-none">{{ title }}</q-card-section>
    <q-card-section class="desc">{{ description }}</q-card-section>
    <q-card-section class="text-center items-end">
        <a :href="insta"><img src="@/assets/ig-icon.png" class="social-icon"></a>
        <a :href="tele"><img src="@/assets/tele-icon.png" class="social-icon"></a>
    </q-card-section>

  </q-card>
</template>
  
<script>
export default {
  name: 'DevTeam',
  props: ['name', 'description', 'title', 'pic', 'insta', 'tele']
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.social-icon {
  max-width: 30px;
  margin-left: auto;
  margin-right: auto;
  size: 100px;
}

.title {
  font-weight: bold;
  font-size: 25px;
}

.role {
  font-weight: bold;
  font-size: 15px;
}
</style>
  