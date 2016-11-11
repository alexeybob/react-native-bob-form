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

import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

import BaseType from './BaseType';

class BaseCheckboxType extends BaseType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Choice', {
            'choices': [null, this.getOptionValue()],
            'multiple': false,
            'strict': false
        });

        this.state = {
            value: this.getOption('data'),
            error: null
        };

        this._settings = {
            'small': {
                'iconSize': 18,
                'blockHeight': 40,
                'fontSize': 16
            },
            'medium': {
                'iconSize': 22,
                'blockHeight': 40,
                'fontSize': 18
            },
            'large': {
                'iconSize': 24,
                'blockHeight': 40,
                'fontSize': 22
            }
        };
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

        let { size, value } = this.props.options;

        let options = {
            'size': (size != null) ? size : 'medium',
            'value': value
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

        // value
        this.addOption('value', options.value, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Callback: {
                    'callback': function(value, parameters){
                        if(
                            !_v.isString(value)
                            && !_v.isObject(value)
                        ){
                            return false;
                        }

                        if(_v.isObject(value)){
                            if(!('key' in value)){
                                return false;
                            }

                            if(!('value' in value)){
                                return false;
                            }
                        }

                        return true;
                    },
                    'parameters': {},
                    'message': `Expected type \"string\" or \"object\" in format: \"{'key': 'US', 'value': 'United States'}\"`
                }
            }
        });
    }

    getOptionValue(type = 'key') {
        let value = this.getOption('value');

        if(_v.isString(value)){
            return value;
        }

        if(type == 'key'){
            return value['key'];
        }else{
            return value['value'];
        }
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
        this.setState({'value': value});

        if(
            this.isValueValid(value)
            && this.props.onChange
        ){
            this.props.onChange(name, value);
        }
    }
    // ---------------------------------------------------------------------------- Processing Value

    // Callback ------------------------------------------------------------------------------------
    _setState(name, value) {
        this.setState({[name]: value});
    };

    onChange = () => {
        let value = (this.state.value == this.getOptionValue()) ? null : this.getOptionValue();

        this.setValue(this.getOption('name'), value);

        this._onChange(value);
    };

    _onChange(event) {}
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
        let _checkType = (this.state.value == this.getOptionValue()) ? 'check-box' : 'check-box-outline-blank';

        let _settings = this._settings[this.getOption('size')];

        return (
            <TouchableHighlight onPress={this.onChange} underlayColor={'lightgrey'}>
                <View style={{flexDirection: 'row', alignItems: 'center', height: _settings['blockHeight']}}>
                    <MaterialIconsIcon name={_checkType} size={_settings['iconSize']}/>
                    <Text style={{fontSize: _settings['fontSize'], marginLeft: 3}}>{this.getOptionValue('value')}</Text>
                </View>
            </TouchableHighlight>
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

BaseCheckboxType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseCheckboxType;