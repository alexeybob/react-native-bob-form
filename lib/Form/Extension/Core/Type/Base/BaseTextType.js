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

        this.configureOptions();

        this.state = {
            value: this.getOption('data'),
            error: null
        };

        this.createField();
    }

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