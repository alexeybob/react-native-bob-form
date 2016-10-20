'use strict';

import BaseTextType from './Base/BaseTextType';

class NumberType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addValidationRule('Type', {'type': 'numeric'});
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }
}

module.exports = NumberType;