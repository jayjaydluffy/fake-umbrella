import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { getCustomers, deleteCustomer } from '../store/actions/customerActions';
import Preloader from './Preloader/Preloader';
import DisabledLoading from './Preloader/DisabledLoading';
import AddCustomer from './AddCustomer';

class Customers extends Component {
    state = {
        edit: null,
        deletePromptShow: false,
        successDelete: false,
        errorDelete: false,
        toDelete: null
    }

    componentDidMount() {
        if (this.props.customers && !this.props.customers.data) {
            this.props.getCustomers();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.deleteStatus.deleting && !this.props.deleteStatus.deleting) {
            // If success delete
            if (this.props.deleteStatus.deleted) {
                this.setState({
                    edit: null,
                    errorDelete: false,
                    successDelete: true,
                    deletePromptShow: false,
                    toDelete: null            
                })
            }
            else {
                this.setState({
                    edit: null,
                    errorDelete: true,
                    successDelete: false,
                    deletePromptShow: false,
                    toDelete: null            
                })
            }
        }
    }

    handleCloseDeletePrompt = () => {
        this.setState({ 
            deletePromptShow: false,
            toDelete: null
        });
    }

    handleOpenDeletePrompt = customer => {
        this.setState({ 
            deletePromptShow: true,
            toDelete: customer
        });
    }

    handleDeleteCustomer = () => {
        this.props.deleteCustomer(this.state.toDelete)
    }

    handleEditCustomer = customer => {
        this.setState({
            edit: customer
        })
    }

    handleRemoveEditCustomer = () => this.setState({ edit: null });

    successDeleteMsg = () => (
        <Alert variant="success">
            <FontAwesomeIcon icon="check-circle" className="mr-2"/> Deleted customer <b>{this.props.deleteStatus.customer}</b>.
        </Alert>
    )

    render () {
        if (!this.props.customers.data || this.props.customers.fetching) {
            return <Preloader />
        }

        return (
            <Fragment>
                <Row><Col><h1 className="py-4 mb-3">Customer Database</h1></Col></Row>
                <Row className="mb-3">
                    <Col sm={7}>
                        { this.state.successDelete ? this.successDeleteMsg() : null }
                        <ListGroup>
                            { this.props.customers.data.map(customer => (
                                <ListGroup.Item
                                    key={customer.id}
                                    href={`#customer${customer.id}`}>
                                    <div className="d-flex w-100 justify-content-between mb-2">
                                        <h4 className="mb-1">{ customer.name }</h4>
                                        <small>{ moment(customer.created_at).fromNow() }</small>
                                    </div>
                                    <dl className="row mb-0">
                                        <dt className="col-sm-4">Contact Person</dt>
                                        <dd className="col-sm-8">{customer.contact_person}</dd>
                                    
                                        <dt className="col-sm-4">Phone</dt>
                                        <dd className="col-sm-8">{customer.phone}</dd>
                                    
                                        <dt className="col-sm-4">Location</dt>
                                        <dd className="col-sm-8">{customer.location}</dd>
                                    
                                        <dt className="col-sm-4">Number of employees</dt>
                                        <dd className="col-sm-8">{customer.num_employees}</dd>
                                    </dl>
                                    <div className="d-flex justify-content-end">
                                        <span 
                                            className="ml-3 text-success" 
                                            title="Edit" 
                                            style={{cursor: 'pointer'}}
                                            onClick={() => this.handleEditCustomer(customer)}>
                                            <FontAwesomeIcon icon="pencil-alt" size="lg"/>
                                        </span>
                                        <span 
                                            className="ml-3 text-danger" 
                                            title="Delete" 
                                            style={{cursor: 'pointer'}}
                                            onClick={() => this.handleOpenDeletePrompt(customer)}>
                                            <FontAwesomeIcon icon="trash" size="lg"/>
                                        </span>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        { this.props.deleteStatus.deleting ? 
                            <DisabledLoading /> : null
                        }
                    </Col>
                    <Col>
                        <AddCustomer edit={this.state.edit} removeEdit={this.handleRemoveEditCustomer}/>
                    </Col>
                </Row>
                <Modal show={this.state.deletePromptShow} onHide={this.handleCloseDeletePrompt}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete <b>{this.state.toDelete ? this.state.toDelete.name : 'customer'}</b>?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleCloseDeletePrompt()}>
                        Close
                        </Button>
                        <Button variant="danger" onClick={() => this.handleDeleteCustomer()}>
                        Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps= state => {
    return {
        customers: state.customer.customers,
        deleteStatus: state.customer.deleteCustomer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomers: () => dispatch(getCustomers()),
        deleteCustomer: customerId => dispatch(deleteCustomer(customerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);