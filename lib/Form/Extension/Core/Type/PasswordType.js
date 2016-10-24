'use strict';

import BaseTextType from './Base/BaseTextType';

class PasswordType extends BaseTextType {
    constructor(props) {
        super(props);

    }

    // Attribute Options ---------------------------------------------------------------------------
    _configureAttrOptions() {
        super._configureAttrOptions();

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
    }
    // --------------------------------------------------------------------------- Attribute Options
}

module.exports = PasswordType;