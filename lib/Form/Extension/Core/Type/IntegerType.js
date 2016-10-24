'use strict';

import BaseTextType from './Base/BaseTextType';

class IntegerType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Type', {'type': 'integer'});
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }
}

module.exports = IntegerType;