'use strict';

import BaseTextType from './Base/BaseTextType';

class IntegerType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addValidationRule('Type', {'type': 'integer'});
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }
}

module.exports = IntegerType;