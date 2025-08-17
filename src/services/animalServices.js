import axiosInstance from '../axiosInstance'

const animalService = {
  getAllAnimals: () => {
    return axiosInstance.get('/Animal/GetAll')
  },
  getAnimalsList: (page, size) => {
    return axiosInstance.get(`/Animal/?PageNumber=${page}&PageSize=${size}`)
  },

  getAnimalById: (id) => {
    return axiosInstance.get(`/Animal?id=${id}`)
  },

  createAnimal: (animal) => {
    return axiosInstance.post('/Animal', animal)
  },

  updateAnimal: (id, animal) => {
    return axiosInstance.put(`/Animal?id=${id}`, animal)
  },

  deleteAnimal: (id) => {
    return axiosInstance.delete(`/Animal?id=${id}`)
  },

  getAnimalListWithoutReproduction: () => {
    return axiosInstance.get('/Animal/GetAnimalListWithoutReproduction')
  },
}
export default animalService
