'use strict';

import BaseTextType from './Base/BaseTextType';

class UrlType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Url', {});
    }

}

module.exports = UrlType;