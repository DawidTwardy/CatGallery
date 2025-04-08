<template>
  <div id="gallery">
    <div class="section">
      <div v-for="(image, index) in catImages" :key="index" class="cat-item" :class="getImageClass(index)">
        <img :src="image.url" :alt="'cat ' + index" @click="openModal(image)" loading="lazy" />
      </div>
    </div>
    <button class="refresh-btn" @click="refreshPage">Odśwież koty</button>
  </div>

  <div v-if="isModalOpen" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <span class="close-button" @click="closeModal">×</span>
      <img :src="modalImage.url" alt="Cat in modal" class="modal-img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CatService from './services/CatService';

const catImages = ref([]);
const isModalOpen = ref(false);
const modalImage = ref({});

const fetchCats = async () => {
  const data = await CatService.getCats();
  catImages.value = data.slice(0, 6);
};

const openModal = (image: { url: string }) => {
  modalImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const refreshPage = () => location.reload();

onMounted(fetchCats);

const getImageClass = (index: number) => {
  if (index === 0) return 'left';
  if (index === 2) return 'right';
  if (index === 3) return 'top';
  if (index === 5) return 'bottom';
  return '';
};
</script>

<style scoped>
body {
  background: linear-gradient(135deg, #f3f4f6, #d9e7f2);
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

#gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
}

.section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  max-width: 1200px;
  background-color: #333333;
  padding: 10px;
  border-radius: 12px;
  height: 80vh;
  box-sizing: border-box;
}

.cat-item {
  display: block;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  background-color: #333333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 100%;
  max-height: 100%;
}

.cat-item img:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.cat-item.left {
  justify-content: flex-start;
}

.cat-item.right {
  justify-content: flex-end;
}

.cat-item.top {
  align-items: flex-start;
}

.cat-item.bottom {
  align-items: flex-end;
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

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
}

.modal-img {
  max-width: 100%;
  min-height: 70vh;
  max-height: 80vh;
  object-fit: contain;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 50px;
  color: #f44336;
  cursor: pointer;
  font-weight: bold;
  z-index: 1100;
  transition: color 0.3s ease, transform 0.3s ease;
}

.close-button:hover {
  color: #d32f2f;
  transform: scale(1.1);
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
