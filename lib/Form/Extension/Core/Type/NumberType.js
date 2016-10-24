'use strict';

import BaseTextType from './Base/BaseTextType';

class NumberType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Type', {'type': 'numeric'});
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }
}

module.exports = NumberType;