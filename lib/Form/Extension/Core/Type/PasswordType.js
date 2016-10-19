'use strict';

import BaseTextType from './Base/BaseTextType';

class PasswordType extends BaseTextType {
    constructor(props) {
        super(props);

    }

    configureAttrOptions() {

        // secureTextEntry
        this.addAttrOption('secureTextEntry', true, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        super.configureAttrOptions();
    }
}

module.exports = PasswordType;