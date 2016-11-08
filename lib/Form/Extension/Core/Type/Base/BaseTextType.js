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

        this.state = {
            value: this.getOption('data'),
            error: null
        };

    }

    getDefaultKeyboardType() {
        return 'default';
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

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
    }
    // ------------------------------------------------------------------------------------- Options

    // Attribute Options ---------------------------------------------------------------------------
    _configureAttrOptions() {
        super._configureAttrOptions();

        let attrOptions = {
            'autoCorrect': (this.getAttrOptionValue('autoCorrect') != null) ? this.getAttrOptionValue('autoCorrect') : true,
            'autoFocus': (this.getAttrOptionValue('autoFocus') != null) ? this.getAttrOptionValue('autoFocus') : false,
            'keyboardType': (this.getAttrOptionValue('keyboardType') != null) ? this.getAttrOptionValue('keyboardType') : this.getDefaultKeyboardType(),
            'maxLength': (this.getAttrOptionValue('maxLength') != null) ? this.getAttrOptionValue('maxLength') : null,
            'placeholder': (this.getAttrOptionValue('placeholder') != null) ? this.getAttrOptionValue('placeholder') : null,
             /* https://facebook.github.io/react-native/docs/colors.html */
            'placeholderTextColor': (this.getAttrOptionValue('placeholderTextColor') != null) ? this.getAttrOptionValue('placeholderTextColor') : 'grey',
            /* https://facebook.github.io/react-native/docs/colors.html */
            'selectionColor': (this.getAttrOptionValue('selectionColor') != null) ? this.getAttrOptionValue('selectionColor') : 'gold'
        };

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
    // ---------------------------------------------------------------------------- Processing Value

    // Callback ------------------------------------------------------------------------------------
    _setState(name, value) {
        this.setState({[name]: value});
    };

    onChange = (event) => {
        this.setValue(this.getOption('name'), event.nativeEvent.text);

        this._onChange(event);
    };

    _onChange(event) {}

    onSubmitEditing = ( name ) => ( value ) => {
        this.isSubmitEditing = true;
        this.setValue(name, this.state.value);

        this._onSubmitEditing();
    };

    _onSubmitEditing() {}
    // ------------------------------------------------------------------------------------ Callback

    // Lifecycle Methods ---------------------------------------------------------------------------
    componentDidMount() {
        this._componentDidMount();
    }

    _componentDidMount() {}
    // --------------------------------------------------------------------------- Lifecycle Methods

    // Rendering -----------------------------------------------------------------------------------
    createField() {
        let value = this.getOption('data');
        let attrOptions = this.clone(this.getAttrOptions());
        let style = this.clone(attrOptions.style);
        delete attrOptions.style;

        if(
            this.getOption('autoheight') == true
            && this.state.height != null
        ){
            style.height = this.state.height;
        }

        return (<TextInput
            value={this.state.value}
            ref={this.getOption('name')}
            onChange={this.onChange}
            onBlur={this.onSubmitEditing(this.getOption('name'))}
            editable={this.getOption('disabled') ? false : true}
            defaultValue={this.getOption('emptyData')}
            style={style}
            {...attrOptions}
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