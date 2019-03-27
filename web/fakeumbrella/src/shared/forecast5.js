import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export const getAddressCoordinates = async (address) => {
    return await geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            return latLng
        })
        .catch(error => {
            return error
        });
}

export const getWeatherForecast = async (address) => {
    const coordinates = getAddressCoordinates(address);
    await axios.get('http://api.openweathermap.org/data/2.5/forecast', {
        params: {
            lat: coordinates.lat,
            lon: coordinates.lng,
            appid: '8836406cbcea81fc322852e7f89dae5c'
        }
    }).then(res => {
        Promise.resolve(res)
    }).catch(err => {
        Promise.resolve(err)
    })
}

const functionWithPromise = item => { //a function that returns a promise
    return Promise.resolve(item)
  }
  
  const anAsyncFunction = async item => {
    return await functionWithPromise(item)
  }

export const addForecastToCustomers = async (customers) => {
    return await Promise.all(customers.map((customer) => (
        customer['weatherForecast'] = getWeatherForecast(customer.location)
    )))
}


