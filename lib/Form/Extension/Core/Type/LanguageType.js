'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import LanguagesData from '../Data/Languages.js';

class LanguageType extends BaseChoiceType {
    constructor(props) {
        super(props);

    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let { nameType } = this.props.options;
        let choices = [];
        let languages = LanguagesData;

        for (var languageKey in languages){
            choices.push({'key': languageKey, 'value': languages[languageKey][nameType]});
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

module.exports = LanguageType;