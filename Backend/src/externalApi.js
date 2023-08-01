const axios = require('axios');

const baseUrl = 'http://api-test.bhut.com.br:3000/api';

const getExternalCars = async () => {
    try {
        const response = await axios.get(`${baseUrl}/cars`);
        return response.data;
    } catch (error) {
        console.error('Erro ao consumir a API externa:', error.message);
        throw new Error('Erro ao consumir a API externa');
    }
};

const createCar = async (carData) => {
    try {
        const response = await axios.post(`${baseUrl}/cars`, carData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar carro na API externa:', error.message);
        throw new Error('Erro ao criar carro na API externa');
    }
};

module.exports = {
    getExternalCars,
    createCar
};
