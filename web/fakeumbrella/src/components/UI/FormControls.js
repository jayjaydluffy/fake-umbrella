import React from 'react';
import classify from 'underscore.string/classify';
import includes from 'lodash/includes';

import Input from './Input';

const formControls = props => {
  const formElementsArray = [];

  for ( let key in props.controls ) {
    if (!includes(props.exclude, key)) {
      formElementsArray.push( {
          id: key,
          config: props.controls[key]
      } );
    }
  }
  return (
    formElementsArray.map( formElement => (
      <Input
        key={formElement.id}
        elementId={`${props.idIndex}-${formElement.id}`}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        elementLabel={formElement.config.label}
        elementLabel2={formElement.config.label2}
        elementLabel3={formElement.config.label3}
        elementLabel4={formElement.config.label4}
        elementClassName={classify(formElement.config.elementType)}
        value={formElement.config.value}
        invalid={!formElement.config.valid && formElement.config.touched}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={( event ) => props.inputChanged( event, formElement.id )}
        invalidFeedback={formElement.config.feedback} />
    ))
  );
};

export default formControls;