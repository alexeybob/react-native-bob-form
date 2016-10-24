'use strict';

import BaseTextType from './Base/BaseTextType';

class EmailType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Email', {});
    }

    getDefaultKeyboardType() {
        return 'email-address';
    }

}

module.exports = EmailType;