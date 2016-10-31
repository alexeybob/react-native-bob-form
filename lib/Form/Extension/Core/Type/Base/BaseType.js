'use strict';

import React, {
    Component,
    Text
} from 'react-native';

import {
    AllValidator
} from 'bob-validator';

import TimerMixin from 'react-timer-mixin';

class BaseType extends Component {
    constructor(props) {
        super(props);

        // options
            this.options = {};
            this.optionValidators = {};

            this.configureOptions();
            this.checkPropsOption();

        // attr options
            this.attrOptions = {};
            this.attrOptionValidators = {};

            this.configureAttrOptions();
            this.checkPropsAttrOption();

        // data validators
            this.dataValidators = {
                isRequired: false,
                rules: {}
            };

            this.setDefaultDataValidationRules();

        // other settings
            this.mixin(TimerMixin, BaseType.prototype);
    }

    mixin(source, target) {
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
    }

    // Label ---------------------------------------------------------------------------------------
    createLabel() {
        if(this.getOption('labelDisplay') == false){
            return null;
        }

        return (
            <Text {...this.getOption('labelAttr')}>
                {this.getOption('label')}{ ((this.getOption('required') == true) ? <Text> *</Text> : null) }:
            </Text>
        );
    }
    //---------------------------------------------------------------------------------------- Label

    // Error ---------------------------------------------------------------------------------------
    createError() {
        if(this.getOption('errorDisplay') == false){
            return null;
        }

        return ((this.state.error != null) ? <Text {...this.getOption('errorAttr')}>{ this.state.error }</Text> : null);
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
                throw new Error(`Invalid option \"${optionKey}\": This option is not available. Available: [${this.getAvaliableOptions().join(', ')}]`);
            }
        }
    }
    //---------------------------------------------------------------------------- Avaliable Options

    // Options -------------------------------------------------------------------------------------
    configureOptions(){
        let { name, attr, data, disabled, emptyData, label, labelDisplay, labelAttr, errorDisplay, errorAttr, required, rules } = this.props.options;

        let options = {
            'name': name,
            'attr': (attr != null) ? attr : {},
            'data': (data != null) ? data : null,
            'disabled': (disabled != null) ? disabled : false,
            'emptyData': (emptyData != null) ? emptyData : '',
            'label': label,
            'labelDisplay': (labelDisplay != null) ? labelDisplay : true,
            'labelAttr': (labelAttr != null) ? labelAttr : {
                'style': {fontWeight: 'bold'}
            },
            'errorDisplay': (errorDisplay != null) ? errorDisplay : true,
            'errorAttr': (errorAttr != null) ? errorAttr : {
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
//                Length: {
//                    'min': 1,
//                    'max': 255
//                },
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

        // emptyData
        this.addOption('emptyData', options.emptyData, {
            isRequired: false,
            rules: {
//                Length: {
//                    'min': 1,
//                    'max': 255
//                },
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

        // labelDisplay
        this.addOption('labelDisplay', options.labelDisplay, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // labelAttr
        this.addOption('labelAttr', options.labelAttr, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        // errorAttr
        this.addOption('errorAttr', options.errorAttr, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        // errorDisplay
        this.addOption('errorDisplay', options.errorDisplay, {
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

        this._configureOptions();

        let response = this.isValidOptions();
        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                throw new Error(`Invalid option \"${errorKey}\": ${errors[errorKey].getError()}`);
            }
        }
    }

    _configureOptions() {}

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

    // Data Validators -----------------------------------------------------------------------------
    setDefaultDataValidationRules() {
        if(this.getOption('required') == true){
            this.dataValidators.isRequired = true;

            this.addDataValidationRule('NotBlank', {});
        }

        let rules = this.getOption('rules');
        for (var ruleKey in rules){
            this.addDataValidationRule(ruleKey, rules[ruleKey]);
        }
    }

    addDataValidationRule(key, value){
        this.dataValidators.rules[key] = value;
    }

    getDataValidators() {
        return this.dataValidators;
    }
    //------------------------------------------------------------------------------ Data Validators

    // Attribute Options ---------------------------------------------------------------------------
    configureAttrOptions() {

        let attrOptions = {
            'style': (this.getAttrOptionValue('style') != null) ? this.getAttrOptionValue('style') : {}
        };

        // style
        this.addAttrOption('style', attrOptions.style, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

        this._configureAttrOptions();

        let response = this.isValid(this.attrOptions, this.attrOptionValidators);
        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                throw new Error(`Invalid attribute options \"${errorKey}\": ${errors[errorKey].getError()}`);
            }
        }
    }

    _configureAttrOptions() { }

    addAttrOption(optionName, optionValue, validators){
        this.attrOptions[optionName] = optionValue;
        this.attrOptionValidators[optionName] = validators;
    }

    getAttrOptions(){
        return this.attrOptions;
    }

    getAttrOption(attrOptionName){
        return (typeof this.attrOptions[attrOptionName] != 'undefined') ? this.attrOptions[attrOptionName] : null;
    }

    getAttrOptionValue(attrOptionName){
        let attr = this.getOption('attr');

        return (typeof attr[attrOptionName] != 'undefined') ? attr[attrOptionName] : null;
    }

    getAvaliableAttrOptions(){
        let avaliableOptions = [];
        let options = this.getAttrOptions();

        for (var optionKey in options){
            avaliableOptions.push(optionKey);
        }

        return avaliableOptions;
    }

    checkPropsAttrOption(){
        let avaliableOptions = this.getAvaliableAttrOptions();
        let attrOptions = this.getOption('attr');

        for (var attrOptionsKey in attrOptions){
            if(!this.inArray(attrOptionsKey, avaliableOptions, false)){
                throw new Error(`Invalid attribute options \"${attrOptionsKey}\": This option is not available. Available: [${this.getAvaliableAttrOptions().join(', ')}]`);
            }
        }
    }
    // --------------------------------------------------------------------------- Attribute Options

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }

        return copy;
    }

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