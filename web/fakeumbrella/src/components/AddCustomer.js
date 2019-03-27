import React, {Component, Fragment} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PlacesAutocomplete from 'react-places-autocomplete';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { updateObject, checkValidity, formDataIsValid, addFormFeedback, joinClasses } from '../shared/utility';
import FormControls from './UI/FormControls';
import classes from './AddCustomers.module.css'
import { addCustomer, editCustomer } from '../store/actions/customerActions';
import DisabledLoading from './Preloader/DisabledLoading';

const addCustomerControls = () => ({
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Customer Name'
        },
        // label: 'Customer',
        value: '',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 72
        },
        valid: false,
        feedback: null,
        touched: false,
        capitalize: true
    },
    contact_person: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Contact person'
        },
        // label: 'Contact Person',
        value: '',
        validation: {
            minLength: 3,
            maxLength: 72
        },
        valid: false,
        feedback: null,
        touched: false,
        capitalize: true
    },
    phone: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Phone'
        },
        // label: 'Contact Person',
        value: '',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 16
        },
        valid: false,
        feedback: null,
        touched: false,
    },
    num_employees: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Number of employees'
        },
        // label: 'Number of employees',
        value: '',
        validation: {
            required: true,
            isNumeric: true,
            minNumber: 1,
        },
        valid: false,
        feedback: null,
        touched: false,
    },
})

class AddCustomer extends Component {
    state = {
        controls: addCustomerControls(),
        location: '',
        submissionValid: true,
        errorAdding: false,
        errorEditing: false,
        successAdding: false,
        successEdit: false,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.addStatus.adding && !this.props.addStatus.adding) {
            // If success
            if (this.props.addStatus.added) {
                this.setState({
                    controls: addCustomerControls(),
                    location: '',
                    submissionValid: true,
                    successAdding: true,
                    errorAdding: false,
                    successEdit: false,
                    errorEditing: false
                })
            }
            else {
                this.setState({
                    submissionValid: true,
                    errorAdding: true,
                    successAdding: false,
                    successEdit: false,
                    errorEditing: false
                })
            }
        }
        else if (prevProps.editStatus.editing && !this.props.editStatus.editing) {
            if (this.props.editStatus.edited) {
                this.setState({
                    controls: addCustomerControls(),
                    location: '',
                    submissionValid: true,
                    successAdding: false,
                    errorAdding: false,
                    successEdit: true,
                    errorEditing: false
                }, () => {
                    this.props.removeEdit()
                })
            }
            else {
                this.setState({
                    submissionValid: true,
                    errorAdding: true,
                    successAdding: false,
                    successEdit: false,
                    errorEditing: true
                })
            }
        }
        else if (this.props.edit) {
            if (prevProps.edit && (this.props.edit.id === prevProps.edit.id)) {
                return;
            }
            let updatedControls = {...this.state.controls};
            Object.keys(addCustomerControls()).forEach(field => {
                updatedControls = updateObject( updatedControls, {
                    [field]: updateObject( updatedControls[field], {
                        value: this.props.edit[field],
                        touched: true,
                        valid: true
                    } )
                } );
            });

            this.setState({
                controls: updatedControls,
                location: this.props.edit.location,
                successAdding: false,
                successEdit: false,
            })
        }
    }

    cancelAddCustomer = e => {
        e.preventDefault();
        this.setState({
            controls: addCustomerControls(),
            location: '',
            submissionValid: true,
            successAdding: false,
            errorAdding: false,
            errorEditing: false,
            successEdit: false
        })
        if (this.props.edit) {
            this.props.removeEdit()
        }
    }

    getErrorMsg = () => {
        let errorMsgs = [];
        const {
          submissionValid,
          errorAdding,
          errorEditing
        } = this.state;

        if (!submissionValid) {
          errorMsgs.push(
            <Fragment>
              <FontAwesomeIcon icon="times-circle" className="mr-2"  /> Validation failed: Make sure you fill in required field/s.
            </Fragment>
          );
        }

        if (errorAdding) {
            errorMsgs.push(
              <Fragment>
                <FontAwesomeIcon icon="times-circle" className="mr-2"  /> {this.props.addStatus.error}
              </Fragment>
            );
          }

        if (errorEditing) {
            errorMsgs.push(
              <Fragment>
                <FontAwesomeIcon icon="times-circle" className="mr-2"  /> {this.props.editStatus.error}
              </Fragment>
            );
          }

        return (
          errorMsgs.map((msg, i) => (
            <Alert key={i} variant="danger">{ msg }</Alert>
            ))
          )
      }

    handleChange = location => {
        this.setState({ 
            location,
            submissionValid: true,
            successAdding: false,
            errorAdding: false,
            successEdit: false,
            errorEditing: false,
         });
    };
    
    inputChangedHandler = ( event, controlName ) => {
        const editedControl = this.state.controls[controlName];
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( editedControl, {
                value: event.target.value,
                valid: checkValidity( event.target.value, editedControl.validation ),
                touched: true,
                feedback: addFormFeedback( event.target.value, editedControl.validation )
            } )
        } );
        this.setState( {
          controls: updatedControls,
          submissionValid: true,
          successAdding: false,
          errorAdding: false,
          successEdit: false,
          errorEditing: false,
        } );
      }

    submitHandler = (e) => {
        e.preventDefault();
        const controls = this.state.controls;
        if (!formDataIsValid(controls)) {
            this.setState({
                submissionValid: false,
                successAdding: false,
                errorAdding: false,
                successEdit: false,
                errorEditing: false,
            });
        }
        else if (this.state.location === '') {
            this.setState({
                submissionValid: false,
                successAdding: false,
                errorAdding: false,
                successEdit: false,
                errorEditing: false,
            });
        }
        else {
            const newCustomer = {
                name: controls.name.value,
                contact_person: controls.contact_person.value,
                phone: controls.phone.value,
                location: this.state.location,
                num_employees: controls.num_employees.value,
            };
            if (this.props.edit) {
                this.props.editCustomer({
                    ...this.props.edit,
                    ...newCustomer
                })
            }
            else {
                this.props.addCustomer(newCustomer);
            }
        }
    }

    successAddingMsg = () => (
        <Alert variant="success">
            <FontAwesomeIcon icon="check-circle" className="mr-2"/> Added customer <b>{this.props.addStatus.newCustomer}</b>.
        </Alert>
    )

    successEditingMsg = () => (
        <Alert variant="success">
            <FontAwesomeIcon icon="check-circle" className="mr-2"/> Updated customer <b>{this.props.editStatus.customer}</b>.
        </Alert>
    )

    render () {
        const errorMsg = this.getErrorMsg();
        return (
            <Card>
                <Card.Body>
                    <Card.Title as="h3">
                        {this.props.edit ? `Update ${this.props.edit.name}` : 'Add Customer'}
                    </Card.Title>
                    <Card.Text as="div">
                        { errorMsg }
                        { this.state.successAdding ? this.successAddingMsg() : null }
                        { this.state.successEdit? this.successEditingMsg() : null }
                        <Form onSubmit={e => this.submitHandler(e)}>
                            <FormControls
                                controls={this.state.controls}
                                inputChanged={this.inputChangedHandler}
                                idIndex='add-customer'/>
                            <PlacesAutocomplete
                                value={this.state.location}
                                onChange={this.handleChange}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className={joinClasses([
                                    "form-group",
                                    classes.LocationField
                                    ])}>
                                    <input
                                    {...getInputProps({
                                        placeholder: 'Location',
                                        className: 'location-search-input form-control',
                                    })}
                                    />
                                    <div className={classes.LocationAutosuggestDropdown}>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active py-1 px-2'
                                        : 'suggestion-item p-1 px-2';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#e1e1e1', cursor: 'pointer' }
                                        : { backgroundColor: '#efefef', cursor: 'pointer' };
                                        return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                                )}
                            </PlacesAutocomplete>
                            <Form.Row>
                                <Col>
                                    <Button 
                                        size="lg" 
                                        variant="secondary" 
                                        block 
                                        type='button' 
                                        onClick={e => this.cancelAddCustomer(e)}>Cancel</Button>
                                </Col>
                                <Col>
                                    <Button size="lg" block type='submit'>
                                        {this.props.edit ? 'Update' : 'Add'}
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card.Text>
                </Card.Body>
                { this.props.addStatus.adding || this.props.editStatus.editing ? 
                    <DisabledLoading /> : null
                }
            </Card>
        );
    }
}

const mapStateToProps= state => {
    return {
        addStatus: state.customer.addCustomer,
        editStatus: state.customer.editCustomer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCustomer: newCustomer => dispatch(addCustomer(newCustomer)),
        editCustomer: customer => dispatch(editCustomer(customer)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);