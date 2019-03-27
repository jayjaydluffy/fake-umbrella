import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

import { getCustomers, getWeatherForecast } from '../store/actions/customerActions';
import Preloader from './Preloader/Preloader';

class Raining extends Component {
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

        return (
            <Fragment>
                <Row><Col><h1 className="py-4 mb-3">Where is it Raining?</h1></Col></Row>
                <Row className="mb-3">
                    <Col md={3}>
                        <ListGroup>
                            { this.props.customers.data.map(customer => customer.willRain ? (
                                <ListGroup.Item
                                    key={customer.id}
                                    href={`#customer${customer.id}`}
                                    onClick={() => this.seeDetails(customer)}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1">{ customer.name }</h4>
                                    </div>
                                </ListGroup.Item>
                            ) : null)
                            }
                        </ListGroup>
                    </Col>
                    <Col>
                        { this.state.seeInDetails ? 
                            <Jumbotron fluid>
                                <Container>
                                <h1>{this.state.seeInDetails.name}</h1>
                                <div className="bg-light p-3 mb-3">
                                    <h4>Location:</h4>
                                    <dl className="row mb-0">
                                        <dt className="col-sm-4">City</dt>
                                        <dd className="col-sm-8">{this.state.seeInDetails.weather_forecast.city.name}</dd>
                                    
                                        <dt className="col-sm-4">Country</dt>
                                        <dd className="col-sm-8">{this.state.seeInDetails.weather_forecast.city.country}</dd>
                                    
                                        <dt className="col-sm-4">Population</dt>
                                        <dd className="col-sm-8">{this.state.seeInDetails.weather_forecast.city.population}</dd>
                                    
                                        <dt className="col-sm-4">Latitude</dt>
                                        <dd className="col-sm-8">{this.state.seeInDetails.weather_forecast.city.coord.lat}</dd>
                                        
                                        <dt className="col-sm-4">Longitude</dt>
                                        <dd className="col-sm-8">{this.state.seeInDetails.weather_forecast.city.coord.lon}</dd>
                                    </dl>
                                </div>
                                <div className="bg-light p-3 mb-3">
                                    <h4>Weather Forecast:</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Weather</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.state.seeInDetails.weather_forecast.list.map((forecast, idx) => (
                                                <tr key={idx}>
                                                    <td>{moment().format('LL') +' - '+moment(forecast.dt_txt).calendar()}</td>
                                                    <td>{forecast.weather[0].main}</td>
                                                    <td>{forecast.weather[0].description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                                </Container>
                            </Jumbotron>
                            : <h2>Click a customer to see all weather forecast for the next 5 days</h2>
                        }
                    </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(Raining);