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

        this.configureOptions();

        this.state = {
            value: this.getOption('data'),
            error: null
        };

        this.createField();
    }

    configureOptions() {
        let { trim } = this.props.options;

        this.addOption('trim', trim ? trim : true, {
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

    processValue(value) {
        if(this.getOption('trim') == true){
            value = value.trim();
        }

        return value;
    }

    setValue(name, value) {
        this.setState({'value': value});

        if(this.props.onChange) {
            this.props.onChange(name, value);
        }
    }

    onChange = ( name ) => ( value ) => {
        this.setValue(name, value);
    };

    onSubmitEditing = ( name ) => ( value ) => {
        let _value = this.processValue(this.state.value);

        this.setValue(name, _value);

        let response = this.isValid(
            {
                'value': _value
            }, {
                'value' : this.getValidators()
            }
        );

        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                this.setState({'error': errors[errorKey].getError()});

                return ;
            }
        }else{
            this.setState({'error': null});
        }
    };

    createField() {
        let value = this.getOption('data');

        let attr = this.getOption('attr');
        let style = (attr.style != null) ? attr.style : {};

        return (<TextInput
            keyboardType="default"
            value={this.state.value}
            style={style}
            ref={this.getOption('name')}
            onChangeText={this.onChange(this.getOption('name'))}
            onBlur={this.onSubmitEditing(this.getOption('name'))}
            editable={this.getOption('disabled') ? false : true}
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
}

BaseTextType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseTextType;