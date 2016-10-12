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

        this.setDefaultOptions();
        this.setDefaultOptionValidators();

        this.setDefaultValidationRules();
    }

    createLabel() {
        let label_attr = this.getOption('label_attr');
        let style = (label_attr.style != null) ? label_attr.style : {fontWeight: 'bold'};

        return (
            <Text style={style}>
                {this.getOption('label')}{ ((this.getOption('required') == true) ? <Text> *</Text> : null) }:
            </Text>
        );
    }

    createError() {
        let error_attr = this.getOption('error_attr');
        let style = (error_attr.style != null) ? error_attr.style : {color: 'red'};

        return ((this.state.error != null) ? <Text style={style}>{ this.state.error }</Text> : null);
    }

    setDefaultOptions(){
        let { name, attr, data, disabled, empty_data, label, label_attr, error_attr, required, rules } = this.props.options;

        this.options = {
            'name': name,
            'attr': (attr != null) ? attr : {},
            'data': (data != null) ? data : null,
            'disabled': (disabled != null) ? disabled : false,
            'empty_data': (empty_data != null) ? empty_data : '',
            'label': label,
            'label_attr': (label_attr != null) ? label_attr : {},
            'error_attr': (error_attr != null) ? error_attr : {},
            'required': (required != null) ? required : true,
            'rules': (rules != null) ? rules : {}
        };
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

    setDefaultOptionValidators() {
        this.optionValidators = {
            name: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Length: {
                        'min': 1,
                        'max': 255
                    },
                    Type: {
                        'type': 'alpha'
                    }
                }
            },
            attr: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'object'
                    }
                }
            },
            data: {
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
            },
            disabled: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'bool'
                    }
                }
            },
            empty_data: {
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
            },
            label: {
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
            },
            label_attr: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'object'
                    }
                }
            },
            error_attr: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'object'
                    }
                }
            },
            required: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'bool'
                    }
                }
            },
            rules: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Type: {
                        'type': 'object'
                    }
                }
            }
        };
    }

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

    isValidOptions() {
        return this.isValid(this.options, this.optionValidators);
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