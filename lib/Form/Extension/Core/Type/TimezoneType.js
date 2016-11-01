'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import TimezoneData from '../Data/Timezone.js';

class TimezoneType extends BaseChoiceType {
    constructor(props) {
        super(props);

    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let choices = [];
        let timezone = TimezoneData;

        for (var timezoneKey in timezone){
            choices.push({'key': timezoneKey, 'value': timezone[timezoneKey]['text']});
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
                    'message': `This value is invalid. Valid data: [{'key': 'Alaskan Standard Time', 'value': '(UTC-09:00) Alaska'},{'key': 'South Africa Standard Time', 'value': '(UTC+02:00) Harare, Pretoria'}]`
                }
            }
        });

        super._configureOptions();
    }
    // ------------------------------------------------------------------------------------- Options
}

module.exports = TimezoneType;