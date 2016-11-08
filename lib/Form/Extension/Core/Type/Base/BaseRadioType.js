'use strict';

import React, {
    Component,
    PropTypes,
    View,
    Text,
    TextInput,
    TouchableHighlight
} from 'react-native';

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

class BaseRadionType extends BaseType {
    constructor(props) {
        super(props);

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

        let { size } = this.props.options;

        let options = {
            'size': (size != null) ? size : 'medium'
        };

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
        let value = 1;

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

    // Rendering -----------------------------------------------------------------------------------
    createField() {
        let _checkType = (this.state.value == 1) ? 'radio-button-checked' : 'radio-button-unchecked';

        let _settings = this._settings[this.getOption('size')];

        return (
            <TouchableHighlight onPress={this.onChange} underlayColor={'lightgrey'}>
                <View style={{flexDirection: 'row', alignItems: 'center', height: _settings['blockHeight']}}>
                    <MaterialIconsIcon name={_checkType} size={_settings['iconSize']}/>
                    <Text style={{fontSize: _settings['fontSize'], marginLeft: 3}}>{'check-box'}</Text>
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

BaseRadionType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseRadionType;