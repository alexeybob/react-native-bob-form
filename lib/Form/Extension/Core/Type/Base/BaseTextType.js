'use strict';

import React, {
    Component,
    PropTypes,
    View,
    Text,
    TextInput
} from 'react-native';

import BaseType from './BaseType';

class BaseTextType extends BaseType {
    constructor(props) {
        super(props);

        this.isSubmitEditing = false;
        this.attrOptions = {};
        this.attrOptionValidators = {};

        this.configureOptions();
        this.checkPropsOption();

        this.configureAttrOptions();
        this.checkPropsAttrOption();

        this.state = {
            value: this.getOption('data'),
            error: null
        };

    }
    // Options -------------------------------------------------------------------------------------
    configureOptions() {
        let { trim } = this.props.options;

        this.addOption('trim', (trim != null) ? trim : true, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        let response = this.isValidOptions();
        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                throw new Error(`Invalid option \"${errorKey}\": ${errors[errorKey].getError()}`);
            }
        }
    }
    // ------------------------------------------------------------------------------------- Options

    // Attribute Options ---------------------------------------------------------------------------
    addAttrOption(optionName, optionValue, validators){
        this.attrOptions[optionName] = optionValue;
        this.attrOptionValidators[optionName] = validators;
    }

    getAttrOptions(){
        return this.attrOptions;
    }

    getAttrOptionValue(attrOptionName){
        let attr = this.getOption('attr');

        return (typeof attr[attrOptionName] != 'undefined') ? attr[attrOptionName] : null;
    }

    configureAttrOptions() {

        let attrOptions = {
            'style': (this.getAttrOptionValue('style') != null) ? this.getAttrOptionValue('style') : {},
            'autoCorrect': (this.getAttrOptionValue('autoCorrect') != null) ? this.getAttrOptionValue('autoCorrect') : true,
            'autoFocus': (this.getAttrOptionValue('autoFocus') != null) ? this.getAttrOptionValue('autoFocus') : false,
            'keyboardType': (this.getAttrOptionValue('keyboardType') != null) ? this.getAttrOptionValue('keyboardType') : 'default',
            'maxLength': (this.getAttrOptionValue('maxLength') != null) ? this.getAttrOptionValue('maxLength') : null,
            'placeholder': (this.getAttrOptionValue('placeholder') != null) ? this.getAttrOptionValue('placeholder') : null,
             /* https://facebook.github.io/react-native/docs/colors.html */
            'placeholderTextColor': (this.getAttrOptionValue('placeholderTextColor') != null) ? this.getAttrOptionValue('placeholderTextColor') : 'grey',
            /* https://facebook.github.io/react-native/docs/colors.html */
            'selectionColor': (this.getAttrOptionValue('selectionColor') != null) ? this.getAttrOptionValue('selectionColor') : 'gold'
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

        // autoCorrect
        this.addAttrOption('autoCorrect', attrOptions.autoCorrect, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // autoFocus
        this.addAttrOption('autoFocus', attrOptions.autoFocus, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        // keyboardType
        this.addAttrOption('keyboardType', attrOptions.keyboardType, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Choice: {
                    'choices': [
                        'default',
                        'email-address',
                        'numeric',
                        'phone-pad',
                        'ascii-capable',
                        'numbers-and-punctuation',
                        'url',
                        'number-pad',
                        'name-phone-pad',
                        'decimal-pad',
                        'twitter',
                        'web-search'
                    ],
                    'multiple': false,
                    'strict': true
                }
            }
        });

        // maxLength
        this.addAttrOption('maxLength', attrOptions.maxLength, {
            isRequired: false,
            rules: {
                Type: {
                    'type': 'integer'
                }
            }
        });

        // placeholder
        this.addAttrOption('placeholder', attrOptions.placeholder, {
            isRequired: false,
            rules: {
                Length: {
                    'min': 1,
                    'max': 255
                }
            }
        });

        // placeholderTextColor
        this.addAttrOption('placeholderTextColor', attrOptions.placeholderTextColor, {
            isRequired: false,
            rules: {
                Type: {
                    'type': 'string'
                }
            }
        });

        // selectionColor
        this.addAttrOption('selectionColor', attrOptions.selectionColor, {
            isRequired: false,
            rules: {
                Type: {
                    'type': 'string'
                }
            }
        });

        let response = this.isValid(this.attrOptions, this.attrOptionValidators);
        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                throw new Error(`Invalid attribute options \"${errorKey}\": ${errors[errorKey].getError()}`);
            }
        }
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
                throw new Error(`Invalid attribute options \"${attrOptionsKey}\": This option is not available. Available: [${this.getAvaliableAttrOptions().join(',')}]`);
            }
        }
    }
    // --------------------------------------------------------------------------- Attribute Options

    // Processing Value ----------------------------------------------------------------------------
    setValue(name, value) {
        this.setState({'value': value});

        if(
            this.isSubmitEditing == true
            && this.isValueValid(value)
            && this.props.onChange
        ){
            this.props.onChange(name, this.processValue(value));
        }
    }

    processValue(value) {
        if(this.getOption('trim') == true){
            value = value.trim();
        }

        return value;
    }

    onChange = ( name ) => ( value ) => {
        this.setValue(name, value);
    };

    onSubmitEditing = ( name ) => ( value ) => {
        this.isSubmitEditing = true;
        this.setValue(name, this.state.value);
    };

    isValueValid(value) {
        let response = this.isValid(
            {
                'value': value
            }, {
                'value' : this.getValidators()
            }
        );

        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                this.setState({'error': errors[errorKey].getError()});

                if(this.props.onValidate){
                    this.props.onValidate(this.getOption('name'), false);
                }

                return false;
            }
        }else{
            this.setState({'error': null});

            if(this.props.onValidate){
                this.props.onValidate(this.getOption('name'), true);
            }

            return true;
        }
    }
    // ---------------------------------------------------------------------------- Processing Value

    // Rendering -----------------------------------------------------------------------------------
    createField() {
        let value = this.getOption('data');

        return (<TextInput
            keyboardType="default"
            value={this.state.value}
            ref={this.getOption('name')}
            onChangeText={this.onChange(this.getOption('name'))}
            onBlur={this.onSubmitEditing(this.getOption('name'))}
            editable={this.getOption('disabled') ? false : true}
            defaultValue={this.getOption('empty_data')}
            {...this.getOption('attr')}
        />);
    }

    getRenderFormat() {
        return (
           <View>
               <View>{this.createLabel()}</View>
               <View>{this.createField()}</View>
               <View>{this.createError()}</View>
           </View>
        );
    }
    // ----------------------------------------------------------------------------------- Rendering
}

BaseTextType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseTextType;