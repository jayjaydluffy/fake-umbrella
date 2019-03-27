import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import findIndex from 'lodash/findIndex';

const initState = {
    customers: {
        fetching: false,
        fetched: false,
        error: null,
        data: null
    },
    addCustomer: {
        adding: false,
        added: false,
        error: null,
        newCustomer: null
    },
    editCustomer: {
        editing: false,
        edited: false,
        error: null,
        customer: null
    },
    deleteCustomer: {
        deleting: false,
        deleted: false,
        error: null,
        customer: null
    }
}

const customerReducer = (state = initState, action) => {
    let customers, addCustomer, editCustomer, deleteCustomer;
    switch (action.type) {
        case actions.GET_CUSTOMERS_START:
            customers = updateObject( state.customers, {
                fetching: true,
                fetched: false,
                error: null,
                data: null
            });
            return {
                ...state,
                customers
            }
        case actions.GET_CUSTOMERS_SUCCESS:
            customers = updateObject( state.customers, {
                fetching: false,
                fetched: true,
                error: null,
                data: action.customers
            });
            return {
                ...state,
                customers
            }
        case actions.GET_CUSTOMERS_FAIL:
            customers = updateObject( state.customers, {
                fetching: false,
                fetched: false,
                error: action.error.message,
                data: []
            });
            return {
                ...state,
                customers
            }
        case actions.ADD_CUSTOMER_START:
            addCustomer = updateObject( state.addCustomer, {
                adding: true,
                added: false,
                error: null,
                newCustomer: null
            });
            return {
                ...state,
                addCustomer
            }
        case actions.ADD_CUSTOMER_SUCCESS:
            addCustomer = updateObject( state.addCustomer, {
                adding: false,
                added: true,
                error: null,
                newCustomer: action.customer.name
            });
            customers = updateObject( state.customers, {
                data: [...state.customers.data, action.customer]
            });
            return {
                ...state,
                addCustomer,
                customers
            }
        case actions.ADD_CUSTOMER_FAIL:
            addCustomer = updateObject( state.addCustomer, {
                adding: false,
                added: false,
                error: action.error.message,
                newCustomer: action.customer
            });
            return {
                ...state,
                addCustomer
            }
        case actions.EDIT_CUSTOMER_START:
            editCustomer = updateObject( state.editCustomer, {
                editing: true,
                edited: false,
                error: null,
                customer: null
            });
            return {
                ...state,
                editCustomer
            }
        case actions.EDIT_CUSTOMER_SUCCESS:
            editCustomer = updateObject( state.editCustomer, {
                editing: false,
                edited: true,
                error: null,
                customer: action.customer.name
            });

            const customersCopy = [...state.customers.data];
            const idxEditedCustomer = findIndex(customersCopy, {id: action.customer.id});
            customersCopy.splice(idxEditedCustomer, 1, action.customer)

            customers = updateObject( state.customers, {
                data: customersCopy
            });

            return {
                ...state,
                editCustomer,
                customers
            }
        case actions.EDIT_CUSTOMER_FAIL:
            editCustomer = updateObject( state.editCustomer, {
                editing: false,
                edited: false,
                error: action.error.message,
                customer: action.customer
            });
            return {
                ...state,
                editCustomer
            }
        case actions.DELETE_CUSTOMER_START:
            deleteCustomer = updateObject( state.deleteCustomer, {
                deleting: true,
                deleted: false,
                error: null,
                customer: null
            });
            return {
                ...state,
                deleteCustomer
            }
        case actions.DELETE_CUSTOMER_SUCCESS:
            deleteCustomer = updateObject( state.deleteCustomer, {
                deleting: false,
                deleted: true,
                error: null,
                customer: action.customer.name
            });

            const currentCustomerCopy = [...state.customers.data];
            const idxDeletedCustomer = findIndex(currentCustomerCopy, {id: action.customer.id});
            currentCustomerCopy.splice(idxDeletedCustomer, 1)

            customers = updateObject( state.customers, {
                data: currentCustomerCopy
            });

            return {
                ...state,
                deleteCustomer,
                customers
            }
        case actions.DELETE_CUSTOMER_FAIL:
            deleteCustomer = updateObject( state.deleteCustomer, {
                deleting: false,
                deleted: false,
                error: action.error.message,
                customer: action.customer
            });
            return {
                ...state,
                deleteCustomer
            }
        case actions.GET_CUSTOMER_WEATHER_FORECAST:
            const updatedCustomersList = [...state.customers.data];
            updatedCustomersList.splice(findIndex(updatedCustomersList, {id: action.customerData.id}), 1, action.customerData)

            customers = updateObject( state.customers, {
                data: updatedCustomersList
            });

            return {
                ...state,
                customers
            }
        default:
            return state;
    }
}

export default customerReducer;