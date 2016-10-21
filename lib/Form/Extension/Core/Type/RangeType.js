'use strict';

import BaseTextType from './Base/BaseTextType';

class RangeType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addValidationRule('Type', {
            type: 'numeric'
        });

        this.addValidationRule('GreaterThanOrEqual', {
            value: this.getOption('minimumValue')
        });

        this.addValidationRule('LessThanOrEqual', {
            value: this.getOption('maximumValue')
        });
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }

    // Options -------------------------------------------------------------------------------------
    configureOptions() {
        let { minimumValue, maximumValue } = this.props.options;

        this.addOption('minimumValue', minimumValue, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {type: 'numeric'},
                LessThan: {'value': (maximumValue != null) ? maximumValue : 0}
            }
        });

        this.addOption('maximumValue', maximumValue, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {type: 'numeric'},
                GreaterThan: {'value': (minimumValue != null) ? minimumValue : 0}
            }
        });

        super.configureOptions();
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = RangeType;