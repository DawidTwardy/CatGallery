<template>
  <div id="gallery">
    <div v-for="(image, index) in sortedImages" :key="index" class="cat-item">
      <img :src="image.url" :alt="'cat ' + index" @click="openModal(image)" />
    </div>
    <button class="refresh-btn" @click="refreshPage">Odśwież stronę</button>
  </div>

  <div v-if="isModalOpen" class="modal" @click="closeModal">
    <img :src="modalImage.url" alt="Cat in modal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CatService from './services/CatService';

const catImages = ref([]);
const isModalOpen = ref(false);
const modalImage = ref({});
const sortedImages = ref([]);

const fetchCats = async () => {
  const data = await CatService.getCats();
  catImages.value = data;
  sortImagesByHeight();
};

const sortImagesByHeight = () => {
  // Sortowanie obrazków po wysokości
  sortedImages.value = [...catImages.value].sort((a, b) => a.height - b.height);
};

const openModal = (image: { url: string }) => {
  modalImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const refreshPage = () => {
  location.reload();
};

onMounted(() => {
  fetchCats();
});
</script>

<style scoped>
body {
  background: linear-gradient(135deg, #f3f4f6, #d9e7f2);
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  gap: 15px;
  padding: 20px;
  max-width: 80%;
  margin: 0 auto;
  background-color: #d1d9e2;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding-bottom: 60px;
}

.cat-item img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.cat-item img:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
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
  border-radius: 12px;
}

.refresh-btn {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 25px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.refresh-btn:hover {
  background-color: #45a049;
}
</style>
