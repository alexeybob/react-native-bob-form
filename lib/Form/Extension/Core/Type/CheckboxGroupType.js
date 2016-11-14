'use strict';

import BaseCheckboxGroupType from './Base/BaseCheckboxGroupType';

class CheckboxGroupType extends BaseCheckboxGroupType {
    constructor(props) {
        super(props);

    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let { choices } = this.props.options;

        let options = {
            'choices': choices,
        };

        // choices
        this.addOption('choices', options.choices, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'array'
                },
                Callback: {
                    'callback': function(value, parameters){
                        if(Object.prototype.toString.call(value) !== '[object Array]'){
                            return false;
                        }

                        for (var valueKey in value){
                            if(Object.prototype.toString.call(value[valueKey]) !== '[object Object]'){
                                return false;
                            }

                            if(!('key' in value[valueKey])){
                                return false;
                            }

                            if(!('value' in value[valueKey])){
                                return false;
                            }
                        }

                        return true;
                    },
                    'parameters': {},
                    'message': `This value is invalid. Valid data: [{'key': 'US', 'value': 'United States'},{'key': 'UK', 'value': 'United Kingdom'}]`
                }
            }
        });

        super._configureOptions();
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = CheckboxGroupType;