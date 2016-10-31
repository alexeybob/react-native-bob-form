'use strict';

import React, {
    Component,
    Platform,
    PropTypes,
    View,
    Text,
    Picker,
} from 'react-native';

import BaseType from './BaseType';

class BaseChoiceType extends BaseType {
    constructor(props) {
        super(props);

        this.isSubmitEditing = false;

        this.state = {
            value: this.getOption('data'),
            error: null
        };

        this.addDataValidationRule('Choice', {
            'choices': this.getChoiceKeys(),
            'multiple': false,
            'strict': true
        });
    }

    // Configuring ---------------------------------------------------------------------------------
    getChoiceKeys() {
        let choices = [];
        let PickerItem = this.getOption('choices');

        {PickerItem.map((item, key) => {
            choices.push(item['key'].toString());
        })}

        return choices;
    }

    processPreferredChoices(choices) {
        let options = this.getOption('preferredChoices');
        let newChoices = this.clone(choices);

        for (var optionKey in options){
            for (var newChoiceKey in newChoices){
                if(options[optionKey] == newChoices[newChoiceKey]['key']){
                    let _tmp = this.clone(newChoices[newChoiceKey]);
                    newChoices.splice(newChoiceKey, 1);
                    newChoices.splice(0, 0, _tmp);

                    break;
                }
            }
        }

        return newChoices;
    }

    getProcessedChoices() {
        let PickerItem = this.processPreferredChoices(
            this.getOption('choices')
        );

        if(this.getOption('placeholder')){
            PickerItem.splice(0, 0, {'key': '', 'value': this.getOption('placeholder')});
        }

        return PickerItem;
    }

    // --------------------------------------------------------------------------------- Configuring

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

        let { choices, preferredChoices, placeholder } = this.props.options;

        let options = {
            'choices': choices,
            'preferredChoices': (preferredChoices != null) ? preferredChoices : [],
            'placeholder': placeholder
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

        // preferredChoices
        this.addOption('preferredChoices', options.preferredChoices, {
            isRequired: true,
            rules: {
                Type: {
                    'type': 'array'
                },
                Choice: {
                    'choices': this.getChoiceKeys(),
                    'multiple': true,
                    'min': 0,
                    'max': this.getChoiceKeys().length,
                    'strict': true
                }
            }
        });

        // placeholder
        this.addOption('placeholder', options.placeholder, {
            isRequired: true,
            rules: {
                Type: {
                    'type': 'string'
                }
            }
        });
    }
    // ------------------------------------------------------------------------------------- Options

    // Attribute Options ---------------------------------------------------------------------------
    _configureAttrOptions() {
        super._configureAttrOptions();

        let attrOptions = {
            'mode': (this.getAttrOptionValue('mode') != null) ? this.getAttrOptionValue('mode') : 'dialog',
            'itemStyle': (this.getAttrOptionValue('itemStyle') != null) ? this.getAttrOptionValue('itemStyle') : {}
        };

        // mode
        this.addAttrOption('mode', attrOptions.mode, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'string'
                },
                Choice: {
                    'choices': [
                        'dialog',
                        'dropdown'
                    ],
                    'multiple': false,
                    'strict': true
                }
            }
        });

        // itemStyle
        this.addAttrOption('itemStyle', attrOptions.itemStyle, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });
    }
    // --------------------------------------------------------------------------- Attribute Options

    // Processing Value ----------------------------------------------------------------------------
    setValue(name, value) {
        this.setState({'value': value});

        if(
            this.isValueValid(value)
            && this.props.onChange
        ){
            this.props.onChange(name, value);
        }
    }

    isValueValid(value) {
        let response = this.isValid(
            {
                'value': value
            }, {
                'value' : this.getDataValidators()
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

    // Callback ------------------------------------------------------------------------------------
    _setState(name, value) {
        this.setState({[name]: value});
    };

    onChange = (newValue) => {
        this.setValue(this.getOption('name'), newValue);
        this._onChange(newValue);
    };

    _onChange(newValue) {}
    // ------------------------------------------------------------------------------------ Callback

    // Lifecycle Methods ---------------------------------------------------------------------------
    componentDidMount() {
        this._componentDidMount();
    }

    _componentDidMount() {}
    // --------------------------------------------------------------------------- Lifecycle Methods

    // Rendering -----------------------------------------------------------------------------------
    createField() {
        let PickerItem = this.getProcessedChoices();

        console.log(`@todo: Platform.OS`);

        return (
            <Picker
                selectedValue={this.state.value}
                ref={this.getOption('name')}
                onValueChange={this.onChange}
                enabled={this.getOption('disabled') ? false : true}
                {...this.getAttrOptions()}
            >
                {PickerItem.map((item) => (
                    <Picker.Item
                        key={item.key.toString()}
                        label={item.value}
                        value={item.key.toString()}
                    />
                ))}
            </Picker>
        );
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

BaseChoiceType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseChoiceType;