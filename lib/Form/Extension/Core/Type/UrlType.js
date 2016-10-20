'use strict';

import BaseTextType from './Base/BaseTextType';

class UrlType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addValidationRule('Url', {});
    }

}

module.exports = UrlType;