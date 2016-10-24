'use strict';

import BaseTextType from './Base/BaseTextType';

class RangeType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Type', {
            type: 'numeric'
        });

        this.addDataValidationRule('Range', {
            min: this.getOption('minimumValue'),
            max: this.getOption('maximumValue')
        });
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

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
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = RangeType;