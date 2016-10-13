'use strict';

import BaseTextType from './Base/BaseTextType';

class TextType extends BaseTextType {
    constructor(props) {
        super(props);

        this.checkPropsOption();
    }

}

module.exports = TextType;