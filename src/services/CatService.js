import axios from 'axios';

const CatService = {
  async getCats() {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=6');
      return response.data;
    } catch (error) {
      console.error("Error fetching cats:", error);
      return [];
    }
  },
};

export default CatService;
