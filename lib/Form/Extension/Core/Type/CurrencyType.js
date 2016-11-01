'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import CurrencyData from '../Data/Currency.js';

class CurrencyType extends BaseChoiceType {
    constructor(props) {
        super(props);

    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let choices = [];
        let currency = CurrencyData;

        for (var currencyKey in currency){
            choices.push({'key': currencyKey, 'value': currency[currencyKey]['name']});
        }

        let options = {
            'choices': choices
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
                    'message': `This value is invalid. Valid data: [{'key': 'USD', 'value': 'US Dollar'},{'key': 'CAD', 'value': 'Canadian Dollar'}]`
                }
            }
        });

        super._configureOptions();
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = CurrencyType;