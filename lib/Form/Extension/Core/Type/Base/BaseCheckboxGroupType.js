'use strict';

import React, {
    Component,
    PropTypes,
    View,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';

import { func as _v } from 'bob-validator';

import CheckboxType from '../CheckboxType';
import BaseType from './BaseType';

class BaseCheckboxGroupType extends BaseType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Type', {
            'type': 'array'
        });

        /* @todo */
        this.addDataValidationRule('Count', {
            'min': 1,
            'max': 100000
        });



//            Callback: {
//                'callback': function(value, parameters){
//                    if(
//                        !_v.isString(value)
//                        && !_v.isObject(value)
//                    ){
//                        return false;
//                    }
//
//                    if(_v.isObject(value)){
//                        if(!('key' in value)){
//                            return false;
//                        }
//
//                        if(!('value' in value)){
//                            return false;
//                        }
//                    }
//
//                    return true;
//                },
//                'parameters': {},
//                'message': `Expected type \"string\" or \"object\" in format: \"{'key': 'US', 'value': 'United States'}\"`
//            }





//        this.addDataValidationRule('Choice', {
//            'choices': [null, 1],
//            'multiple': false,
//            'strict': false
//        });

        this.state = {
            value: this.getProcessedValue(),
            error: null
        };
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

        let { size } = this.props.options;

        let options = {
            'size': (size != null) ? size : 'medium'
        };

        // size
        this.addOption('size', options.size, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Choice: {
                    'choices': ['small', 'medium', 'large'],
                    'multiple': false,
                    'strict': true
                }
            }
        });
    }
    // ------------------------------------------------------------------------------------- Options

    // Attribute Options ---------------------------------------------------------------------------
    _configureAttrOptions() {
        super._configureAttrOptions();

        let attrOptions = {
            'selectionColor': (this.getAttrOptionValue('selectionColor') != null) ? this.getAttrOptionValue('selectionColor') : 'gold'
        };

        // selectionColor
        this.addAttrOption('selectionColor', attrOptions.selectionColor, {
            isRequired: false,
            rules: {
                Type: {
                    'type': 'string'
                }
            }
        });
    }
    // --------------------------------------------------------------------------- Attribute Options

    // Processing Value ----------------------------------------------------------------------------
    setValue(name, value) {
        if(
            this.isValueValid(value)
            && this.props.onChange
        ){
            this.props.onChange(name, value.join(','));
        }
    }
    getProcessedValue() {
        let value = this.getOption('data');

        if(_v.isString(value)){
            return value.split(",");
        }

        return [];
    }
    // ---------------------------------------------------------------------------- Processing Value

    // Callback ------------------------------------------------------------------------------------
    _setState(name, value) {
        this.setState({[name]: value});
    };

    onChangeItem = (name, value) => {
        let _value = this.state['value'];

        if(value == null){
            let _pos = null;
            for (var _valueKey in _value){
                if(_value[_valueKey] == name){
                    _pos = _valueKey;
                    break;
                }
            }

            if(_pos != null){
                _value.splice(_pos, 1);
            }
        }else{
            _value.push(value);
        }

        this.setState({'value': _value});

        this.setValue(this.getOption('name'), this.state.value);
    };

    onValidateItem = (name, value) => {
        this.setState({[name+'Valid']: value});
    };

    checkIsOptionSelected(value) {
        if(this.inArray(value, this.state.value, false)){
            return value;
        }

        return null;
    }
    // ------------------------------------------------------------------------------------ Callback

    // Lifecycle Methods ---------------------------------------------------------------------------
    componentDidMount() {
        this._componentDidMount();
    }

    _componentDidMount() {}
    // --------------------------------------------------------------------------- Lifecycle Methods

    // Data Validators -----------------------------------------------------------------------------
    setDefaultDataValidationRules() {
        let rules = this.getOption('rules');
        for (var ruleKey in rules){
            this.addDataValidationRule(ruleKey, rules[ruleKey]);
        }
    }
    //------------------------------------------------------------------------------ Data Validators

    // Rendering -----------------------------------------------------------------------------------
    createField() {

        let rows = [];
        let choices = this.getOption('choices');

        for (var choiceKey in choices){
            rows.push(
                <CheckboxType
                    key={choiceKey}
                    options={{
                        'name': choices[choiceKey]['key'],
                        'label': choices[choiceKey]['value'],
                        'data': this.checkIsOptionSelected(choices[choiceKey]['key']),
                        'size': this.getOption('size'),
                        'value': choices[choiceKey],
                        'labelDisplay': false,
                        'errorDisplay': false
                    }}
                    onChange={this.onChangeItem}
                    onValidate={this.onValidateItem}
                />
            );
        }

        return rows;
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

BaseCheckboxGroupType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseCheckboxGroupType;