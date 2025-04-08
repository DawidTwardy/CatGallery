<template>
  <div class="modal" @click.self="close">
    <div class="modal-content">
      <span class="close-button" @click="close">×</span>
      <img :src="cat.url" alt="cat" class="modal-image" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cat: Object,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: black;
  cursor: pointer;
}
</style>
