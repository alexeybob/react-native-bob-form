'use strict';

import React, {
    Component,
    Text
} from 'react-native';

import {
    AllValidator
} from 'bob-validator';

class BaseType extends Component {
    constructor(props) {
        super(props);

        this.options = {};
        this.optionValidators = {};

        this.setDefaultOptions();
        this.setDefaultValidationRules();
    }

    // Label ---------------------------------------------------------------------------------------
    createLabel() {
        if(this.getOption('label_display') == false){
            return null;
        }

        let label_attr = this.getOption('label_attr');

        return (
            <Text style={label_attr.style}>
                {this.getOption('label')}{ ((this.getOption('required') == true) ? <Text> *</Text> : null) }:
            </Text>
        );
    }
    //---------------------------------------------------------------------------------------- Label

    // Error ---------------------------------------------------------------------------------------
    createError() {
        if(this.getOption('error_display') == false){
            return null;
        }

        let error_attr = this.getOption('error_attr');

        return ((this.state.error != null) ? <Text style={error_attr.style}>{ this.state.error }</Text> : null);
    }
    //---------------------------------------------------------------------------------------- Error

    // Avaliable Options ---------------------------------------------------------------------------
    getAvaliableOptions(){
        let avaliableOptions = [];
        let options = this.getOptions();

        for (var optionKey in options){
            avaliableOptions.push(optionKey);
        }

        return avaliableOptions;
    }

    checkPropsOption(){
        let avaliableOptions = this.getAvaliableOptions();

        for (var optionKey in this.props.options){

            if(!this.inArray(optionKey, avaliableOptions, false)){
                throw new Error(`Invalid option \"${optionKey}\": This option is not available. Available: [${this.getAvaliableOptions().join(',')}]`);
            }
        }
    }
    //---------------------------------------------------------------------------- Avaliable Options

    // Options -------------------------------------------------------------------------------------
    setDefaultOptions(){
        let { name, attr, data, disabled, empty_data, label, label_display, label_attr, error_display, error_attr, required, rules } = this.props.options;

        let options = {
            'name': name,
            'attr': (attr != null) ? attr : {},
            'data': (data != null) ? data : null,
            'disabled': (disabled != null) ? disabled : false,
            'empty_data': (empty_data != null) ? empty_data : '',
            'label': label,
            'label_display': (label_display != null) ? label_display : true,
            'label_attr': (label_attr != null) ? label_attr : {
                'style': {fontWeight: 'bold'}
            },
            'error_display': (error_display != null) ? error_display : true,
            'error_attr': (error_attr != null) ? error_attr : {
                'style': {color: 'red'}
            },
            'required': (required != null) ? required : true,
            'rules': (rules != null) ? rules : {}
        };

        // name
        this.addOption('name', options.name, {
            isRequired: true,
            rules: {
               NotBlank: {},
               Length: {
                   'min': 1,
                   'max': 255
               },
               Type: {
                   'type': 'alnum'
               }
            }
        });

        // attr
        this.addOption('attr', options.attr, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        // data
        this.addOption('data', options.data, {
            isRequired: false,
            rules: {
                Length: {
                    'min': 1,
                    'max': 255
                },
                Type: {
                    'type': 'string'
                }
            }
        });

        // disabled
        this.addOption('disabled', options.disabled, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // empty_data
        this.addOption('empty_data', options.empty_data, {
            isRequired: false,
            rules: {
                Length: {
                    'min': 1,
                    'max': 255
                },
                Type: {
                    'type': 'string'
                }
            }
        });

        // label
        this.addOption('label', options.label, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Length: {
                    'min': 1,
                    'max': 255
                },
                Type: {
                    'type': 'string'
                }
            }
        });

        // label_display
        this.addOption('label_display', options.label_display, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // label_attr
        this.addOption('label_attr', options.label_attr, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        // error_attr
        this.addOption('error_attr', options.error_attr, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        // error_display
        this.addOption('error_display', options.error_display, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // required
        this.addOption('required', options.required, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // rules
        this.addOption('rules', options.rules, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });
    }

    getOptions(){
        return this.options;
    }

    addOption(optionName, optionValue, validators){
        this.options[optionName] = optionValue;
        this.optionValidators[optionName] = validators;
    }

    getOption(optionName) {
        return this.options[optionName];
    }

    updateOption(optionName, optionValue, validators = null){
        this.options[optionName] = optionValue;

        if(validators != null){
            this.optionValidators[optionName] = validators;
        }
    }
    //-------------------------------------------------------------------------------------- Options

    // Options Validators --------------------------------------------------------------------------
    isValidOptions() {
        return this.isValid(this.options, this.optionValidators);
    }
    //--------------------------------------------------------------------------- Options Validators

    // Validators ----------------------------------------------------------------------------------
    setDefaultValidationRules() {
        this.validators = {
            isRequired: false,
            rules: {}
        };

        if(this.getOption('required') == true){
            this.validators.isRequired = true;

            this.addValidationRule('NotBlank', {});
        }

        let rules = this.getOption('rules');
        for (var ruleKey in rules){
            this.addValidationRule(ruleKey, rules[ruleKey]);
        }
    }

    addValidationRule(key, value){
        this.validators.rules[key] = value;
    }

    getValidators() {
        return this.validators;
    }
    //----------------------------------------------------------------------------------- Validators

    inArray(needle, haystack, strict) {
        for (var haystackKey in haystack){
            if(strict == true && haystack[haystackKey] === needle){
                return true;
            }else if(strict == false && haystack[haystackKey] == needle){
                return true;
            }
        }

        return false;
    }

    isValid(data, validationSchema){
        let _oec = new AllValidator({
            validators: validationSchema,
            validationType: 'schema',
            errorType: 'object'
        });

        _oec.validate(data);
        if(!_oec.isValid()) {
            let errors = _oec.getErrors();

            return [false, errors];
        }

        return [true];
    }

    render() {
        return this.getRenderFormat();
    }
}

module.exports = BaseType;