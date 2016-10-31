'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import CountriesData from '../Data/Countries.js';

class CountryType extends BaseChoiceType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Country', {});
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let { nameType } = this.props.options;
        let choices = [];
        let countries = CountriesData.countries;

        for (var countryKey in countries){
            choices.push({'key': countryKey, 'value': countries[countryKey][nameType]});
        }

        let options = {
            'choices': choices,
            'nameType': (nameType != null) ? nameType : 'name',
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

        // nameType
        this.addOption('nameType', options.nameType, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Choice: {
                    'choices': [
                        'name',
                        'native'
                    ],
                    'multiple': false,
                    'strict': true
                }
            }
        });

        super._configureOptions();
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = CountryType;