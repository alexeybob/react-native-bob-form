'use strict';

import BaseCheckboxType from './Base/BaseCheckboxType';

class CheckboxType extends BaseCheckboxType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Choice', {
            'choices': [0, 1],
            'multiple': false,
            'strict': false
        });
    }
}

module.exports = CheckboxType;