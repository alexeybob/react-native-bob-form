'use strict';

import React, {
    Component
} from 'react-native';

import {
    AllValidator
} from 'bob-validator';

class BaseType extends Component {
    constructor(props) {
        super(props);
    }

    isValid(data, validationSchema){
        let _oec = new AllValidator({
            validators: validationSchema,
            validationType: 'schema',
            errorType: 'array'
        });
        _oec.validate(data);

        if(!_oec.isValid()) {
            let errors = _oec.getErrors();

            console.log(errors);
        }
    }

    render() {
        return this.getRenderFormat();
    }
}

//export default TextType;
module.exports = BaseType;