import * as actions from './actionTypes';
// import axios from '../../shared/axios';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const getCustomersStart = () => ({
    type: actions.GET_CUSTOMERS_START,
    customers: []
});

const getCustomersSuccess = customers => ({
    type: actions.GET_CUSTOMERS_SUCCESS,
    customers
});

const getCustomersFail = error => ({
    type: actions.GET_CUSTOMERS_SUCCESS,
    error
});

export const getCustomers = () => {
    return (dispatch, getState) => {
        dispatch(getCustomersStart());
        axios.get('http://localhost:8000/api/customers/')
            .then(async (res) => {
                dispatch(getCustomersSuccess(res.data));
            })
            .catch(err => {
                dispatch(getCustomersFail(err))
            });
    }
}

const addCustomerStart = () => ({
    type: actions.ADD_CUSTOMER_START,
});

const addCustomerSuccess = customer => ({
    type: actions.ADD_CUSTOMER_SUCCESS,
    customer
});

const addCustomerFail = (error, customer) => ({
    type: actions.ADD_CUSTOMER_SUCCESS,
    error,
    customer
});

export const addCustomer = newCustomer => {
    return (dispatch, getState) => {
        dispatch(addCustomerStart());
        axios.post('http://localhost:8000/api/customers/', newCustomer)
            .then(res => {
                dispatch(addCustomerSuccess(res.data));
            })
            .catch(err => {
                dispatch(addCustomerFail(err, newCustomer.name))
            });
    }
}

const editCustomerStart = () => ({
    type: actions.EDIT_CUSTOMER_START,
});

const editCustomerSuccess = customer => ({
    type: actions.EDIT_CUSTOMER_SUCCESS,
    customer
});

const editCustomerFail = (error, customer) => ({
    type: actions.EDIT_CUSTOMER_FAIL,
    error,
    customer
});

export const editCustomer = customer => {
    return (dispatch, getState) => {
        dispatch(editCustomerStart());
        axios.put('http://localhost:8000/api/customers/'+customer.id+'/', customer)
            .then(res => {
                dispatch(editCustomerSuccess(res.data));
            })
            .catch(err => {
                dispatch(editCustomerFail(err, customer.name))
            });
    }
}

const deleteCustomerStart = () => ({
    type: actions.DELETE_CUSTOMER_START,
});

const deleteCustomerSuccess = customer => ({
    type: actions.DELETE_CUSTOMER_SUCCESS,
    customer
});

const deleteCustomerFail = (error, customer) => ({
    type: actions.DELETE_CUSTOMER_FAIL,
    error,
    customer
});

export const deleteCustomer = customer => {
    return (dispatch, getState) => {
        dispatch(deleteCustomerStart());
        axios.delete('http://localhost:8000/api/customers/'+customer.id+'/')
            .then(res => {
                dispatch(deleteCustomerSuccess(customer));
            })
            .catch(err => {
                dispatch(deleteCustomerFail(err, customer.name))
            });
    }
}

export const getWeatherForecast = customer => {
    return (dispatch, getState) => {
        geocodeByAddress(customer.location)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                // Get forecast for 5 days
                axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                    params: {
                        lat: latLng.lat,
                        lon: latLng.lng,
                        appid: '8836406cbcea81fc322852e7f89dae5c'
                    }
                }).then(res => {
                    console.log(`${customer.location} weather forecast.`, res)
                    dispatch({
                        type: actions.GET_CUSTOMER_WEATHER_FORECAST,
                        customerData: {
                            ...customer,
                            weather_forecast: res.data,
                            forecastEnd: res.data.list[res.data.cnt-1].dt_txt,
                            willRain: res.data.list.some(forecast => {
                                return forecast.weather[0].main === 'Rain'
                            })
                        },
                    })
                }).catch(err => {
                    console.log(`Error getting ${customer.location} weather forecast`, err)
                })
            })
            .catch(error => {
                console.log(`Error getting ${customer.location} coordinates`, error)
            });
    }
}