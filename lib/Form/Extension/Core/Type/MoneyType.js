'use strict';

import React, {
    Component,
    View,
    Text
} from 'react-native';

import BaseTextType from './Base/BaseTextType';
import CurrencyData from '../Data/Currency.js';

class MoneyType extends BaseTextType {
    constructor(props) {
        super(props);

        this.currencyHeight = 60;

        this.currencyWidthSymbol = 9;
        this.currencySymbolCount = 1;

        this.addDataValidationRule('Type', {'type': 'numeric'});
    }

    getDefaultKeyboardType() {
        return 'numeric';
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        super._configureOptions();

        let { currency } = this.props.options;

        // currency
        this.addOption('currency', (currency != null) ? currency : 'USD', {
            isRequired: true,
            rules: {
                NotBlank: {},
                Length: {
                    'min': 3,
                    'max': 3
                },
                Choice: {
                    'choices': this.getSupportedCurrencyKeys(),
                    'multiple': false,
                    'strict': true,
                    'message': 'Unsupported Currency.'
                }
            }
        });
    }
    // ------------------------------------------------------------------------------------- Options

    // Currency ------------------------------------------------------------------------------------
    getSupportedCurrencyKeys () {
        let supportedCurrency = [];

        for (var currencyKey in CurrencyData){
            supportedCurrency.push(currencyKey);
        }

        return supportedCurrency;
    }

    getCurrencySymbol() {
        let currency = CurrencyData[this.getOption('currency').toUpperCase()];

        if(currency == null){
            this.currencySymbolCount = this.getOption('currency').length;

            return this.getOption('currency');
        }

        this.currencySymbolCount = currency.symbol.length;

        return currency.symbol;
    }
    // ------------------------------------------------------------------------------------ Currency

    getRenderFormat() {
        let currencySymbol = this.getCurrencySymbol();
        let currencyWidth = (this.currencyWidthSymbol * this.currencySymbolCount);
        let height = this.currencyHeight;

        return (
            <View>
                <View>{this.createLabel()}</View>
                <View style={{flexDirection: 'row', height: height}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: currencyWidth}}>
                        <Text>{currencySymbol}</Text>
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

module.exports = MoneyType;