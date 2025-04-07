<template>
  <div>
    <!-- Loader -->
    <div v-if="isLoading" class="loader">Ładowanie...</div>
    
    <!-- Galeria -->
    <div id="gallery" v-if="!isLoading">
      <div v-for="(image, index) in catImages" :key="index" class="cat-item">
        <img :src="image.url" :alt="'cat ' + index" @click="openModal(image)" />
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <img :src="modalImage.url" alt="Cat in modal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CatService from '../services/CatService';

const catImages = ref([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const modalImage = ref({});

const fetchCats = async () => {
  const data = await CatService.getCats();
  catImages.value = data;
  isLoading.value = false;
};

const openModal = (image: { url: string }) => {
  modalImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  fetchCats();
});
</script>

<style scoped>
#gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 20px;
}

.cat-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, filter 0.3s;
}

.cat-item img:hover {
  transform: scale(1.1);
  filter: brightness(1.1);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 10px;
}

.loader {
  font-size: 24px;
  color: #646cff;
  font-weight: bold;
  padding: 50px;
}
</style>
