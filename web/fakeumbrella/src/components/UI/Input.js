import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import classes from './Input.module.css';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {DebounceInput} from 'react-debounce-input';

import { joinClasses } from '../../shared/utility';


const input = ( props ) => {
	let inputElement = null;
	let isInvalid = null;
	const inputClasses = [classes[props.elementClassName]];

	if (props.invalid && props.shouldValidate) {
		isInvalid = true;
	}

	switch ( props.elementType ) {
		case 'input':
			inputElement = (
					<DebounceInput element={Form.Control}
						debounceTimeout={500}
						{...props.elementConfig}
						isInvalid={isInvalid}
						value={props.value}
						onChange={props.changed} />
			);
			break;
		case 'input-group':
			inputElement = (
					<InputGroup>
						<DebounceInput element={Form.Control}
							debounceTimeout={500}
							{...props.elementConfig}
							isInvalid={isInvalid}
							value={props.value}
							onChange={props.changed}
							className="border-right-0"
							data-lpignore
						/>
						<InputGroup.Append>
							<Button
								variant="outline-secondary"
								className={joinClasses(["border-left-0", isInvalid ? classes.InvalidAppendBtn : ''])}
								onClick={props.appendBtnClicked}>
								<FontAwesomeIcon icon={props.appendBtnIcon} size="sm"/>
							</Button>
						</InputGroup.Append>
						{ props.invalidFeedback ? 
							<Form.Control.Feedback type="invalid">
								{ props.invalidFeedback }
							</Form.Control.Feedback> : null
						}
					</InputGroup>
			);
			break;
		case 'textarea':
			inputElement = (
				<DebounceInput element={Form.Control}
					debounceTimeout={500}
					rows="3"
					{...props.elementConfig}
					as="textarea"
					value={props.value}
					onChange={props.changed}
					isInvalid={isInvalid} />
			);
			break;
		default:
			inputElement = (
					<DebounceInput element={Form.Control}
						debounceTimeout={500}
						{...props.elementConfig}
						isInvalid={isInvalid}
						value={props.value}
						onChange={props.changed} />
			);
	}

	return (
		<Form.Group
			controlId={props.elementId}
			className={joinClasses(inputClasses)}
			as={props.formRow ? Col : 'div'} >
			<Form.Label className={props.elementLabel4 ? "d-flex" : ''}>
				{ props.elementLabel }
				{ props.elementLabel2 ? <span className="ml-1 font-weight-normal">{props.elementLabel2}</span> : null }
				{ props.elementLabel4 ? <span className={classes.Label4}>{props.elementLabel4}</span> : null }
				{ props.elementLabel3 ? <div className={joinClasses(["font-weight-normal", classes.Label3])}>{props.elementLabel3}</div> : null }
			</Form.Label>
			{inputElement}
			{ props.invalidFeedback && props.elementType !== 'input-group' ? 
				<Form.Control.Feedback type="invalid">
					{ props.invalidFeedback }
				</Form.Control.Feedback> : null
			}
		</Form.Group>
	);
};

export default input;