'use strict';

import React, {
    Component,
    View,
    Text
} from 'react-native';

import BaseTextType from './Base/BaseTextType';

class PercentType extends BaseTextType {
    constructor(props) {
        super(props);

        this.addDataValidationRule('Regex', {
            'pattern': /^(([\.][\d]{1,4})|([\d]+)|([\d]+[\.][\d]{1,2}))$/,
            'message': `This value is not valid. Valid example: .095 or 95`
        });
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }

    // Processing Value ----------------------------------------------------------------------------
    processValue(value) {
        value = super.processValue(value);

        if(value[0] == '.'){
            value = value * 100;
        }

        return value.toString();
    }
    // ---------------------------------------------------------------------------- Processing Value

    getRenderFormat() {
        let height = 60;

        return (
            <View>
                <View>{this.createLabel()}</View>
                <View style={{flexDirection: 'row', height: height}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: 10}}>
                        <Text>%</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {this.createField()}
                    </View>
                </View>
                <View>{this.createError()}</View>
            </View>
        );
    }
}

module.exports = PercentType;