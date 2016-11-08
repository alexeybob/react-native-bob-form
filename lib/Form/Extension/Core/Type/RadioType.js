'use strict';

import BaseRadioType from './Base/BaseRadioType';

class RadioType extends BaseRadioType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Choice', {
            'choices': [0, 1],
            'multiple': false,
            'strict': false
        });
    }
}

module.exports = RadioType;