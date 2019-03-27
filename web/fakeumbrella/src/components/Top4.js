import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';

import { getCustomers, getWeatherForecast } from '../store/actions/customerActions';
import Preloader from './Preloader/Preloader';

class Top4 extends Component {
    state = {
        seeInDetails: null
    }

    componentDidMount() {
        if (this.props.customers && !this.props.customers.data) {
            this.props.getCustomers();
        }
        else {
            this.props.customers.data.forEach(customer => {
                if (!customer.weather_forecast || 
                    (customer.weather_forecast && moment() > moment(customer.forecastEnd))) {
                        this.props.getForecast(customer)
                    }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.customers.data && this.props.customers.data) {
            this.props.customers.data.forEach(customer => {
                if (!customer.weather_forecast || 
                    (customer.weather_forecast && moment() > moment(customer.forecastEnd))) {
                        this.props.getForecast(customer)
                    }
            })
        }
    }

    seeDetails = customer => {
        this.setState({
            seeInDetails: customer
        })
    }

    render () {
        if (this.props.customers && !this.props.customers.data) {
            return <Preloader />
        }

        const top4 = take(orderBy(this.props.customers.data, ['num_employees', 'id'], ['desc', 'asc']), 4);
        return (
            <Fragment>
                <Row><Col><h1 className="py-4 mb-3">Top 4 Customers</h1></Col></Row>
                <Row className="mb-3">
                    <BarChart
                        height={650}
                        width={1000}
                        data={top4}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip wrapperStyle={{ width: 300, backgroundColor: '#ccc' }} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar type="monotone" dataKey="num_employees" fill="#e51c23" barSize={150}>
                        {
                            top4.map((entry, index) => (
                                <Cell key={index} fill={ entry.willRain ? '#4CAF50' : '#e51c23'} />
                            ))
                        }
                        </Bar>
                    </BarChart>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps= state => {
    return {
        customers: state.customer.customers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomers: () => dispatch(getCustomers()),
        getForecast: customer => dispatch(getWeatherForecast(customer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top4);