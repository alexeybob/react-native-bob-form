'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import LocalesData from '../Data/Locales.js';

class LocaleType extends BaseChoiceType {
    constructor(props) {
        super(props);

    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let { nameType } = this.props.options;
        let choices = [];
        let locales = LocalesData['language-names'];

        nameType = (nameType != null) ? nameType : 'name';
        for (var localeKey in locales){
            choices.push({'key': localeKey, 'value': locales[localeKey][(nameType == 'name') ? 1 : 0]});
        }

        let options = {
            'choices': choices,
            'nameType': nameType,
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
                    'message': `This value is invalid. Valid data: [{'key': 'EN', 'value': 'English'},{'key': 'FR', 'value': 'French'}]`
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
                        'nativeName'
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

module.exports = LocaleType;