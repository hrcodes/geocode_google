const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.GOOGLE_APIKEY;
const ADDRESS = 'Estação Sé, São Paulo, SP';

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

let addressComponents = [];

async function getGeolocation() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        address: ADDRESS,
        key: API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      const { address_components, formatted_address, geometry } =
        response.data.results[0];

      addressComponents = address_components;

      console.log('\n');
      console.log('Endereço: ', formatted_address);
      console.log('Latitude: ', geometry.location.lat);
      console.log('Longitude: ', geometry.location.lng);
      console.log('\n');
      console.log('CEP: ', formatComponents('postal_code'));
      console.log('Logradouro: ', formatComponents('route'));
      console.log('Bairro: ', formatComponents('sublocality'));
      console.log('Cidade: ', formatComponents('administrative_area_level_2'));
      console.log('Estado: ', formatComponents('administrative_area_level_1'));
      console.log(
        'Estado: ',
        formatComponents('administrative_area_level_1', 'short_name')
      );
      console.log('País: ', formatComponents('country'));
      console.log('Sigla: ', formatComponents('country', 'short_name'));
      console.log('\n');
    } else {
      console.error('Erro:', response.data.status);
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error.message);
  }
}

function formatComponents(key, returnKey = 'long_name') {
  return addressComponents.find((component) => component.types.includes(key))[
    returnKey
  ];
}

getGeolocation();
