<template>
  
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ redirect }) {
    redirect('/login');
  }
}
</script>
