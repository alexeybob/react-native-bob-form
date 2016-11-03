'use strict';

import BaseChoiceType from './Base/BaseChoiceType';
import { func as _v } from 'bob-validator';

//import _repositoryData from '../Data/Test/data2.js';

class EntityType extends BaseChoiceType {
    constructor(props) {
        super(props);

        this._preferredChoices = [];
        this._entityChoices = null;
    }

    // Options -------------------------------------------------------------------------------------
    _configureOptions() {
        let { queryConfiguration } = this.props.options;

        let options = {
            'queryConfiguration': queryConfiguration
        };

        // preferredChoices
        this.removeOption('preferredChoices');

        // queryConfiguration
        this.addOption('queryConfiguration', options.queryConfiguration, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'object'
                }
            }
        });

//        // choices
//        this.addOption('choices', this._getChoiceOption(), {
//            isRequired: true,
//            rules: {
//                NotBlank: {},
//                Type: {
//                    'type': 'array'
//                },
//                Callback: {
//                    'callback': function(value, parameters){
//                        if(Object.prototype.toString.call(value) !== '[object Array]'){
//                            return false;
//                        }
//
//                        for (var valueKey in value){
//                            if(Object.prototype.toString.call(value[valueKey]) !== '[object Object]'){
//                                return false;
//                            }
//
//                            if(!('key' in value[valueKey])){
//                                return false;
//                            }
//
//                            if(!('value' in value[valueKey])){
//                                return false;
//                            }
//                        }
//
//                        return true;
//                    },
//                    'parameters': {},
//                    'message': `This value is invalid. Valid data: [{'key': 'US', 'value': 'United States'},{'key': 'UK', 'value': 'United Kingdom'}]`
//                }
//            }
//        });

        super._configureOptions();
    }

    _getPreferredChoicesOption() {
        return this._preferredChoices;
    }
    // ------------------------------------------------------------------------------------- Options

    // Entity Choices ------------------------------------------------------------------------------
    _getChoiceOption() {
        return this._entityChoices ? this._entityChoices : [{'key': this.getOption('data'), 'value': 'Loading ...'}];
    }

//    __getChoiceOption() {
//        this._entityChoices = null;
//
//        let { repositoryUrl, table, key, value } = (this.getOption('queryConfiguration') ? this.getOption('queryConfiguration') : []);
//
//        let options = {
//            'repositoryUrl': repositoryUrl,
//            'table': (table != null) ? table : '%table%',
//            'key': (key != null) ? key : '%key%',
//            'value': (value != null) ? value : '%value%'
//        };
//
//        let validators = {
//            'repositoryUrl': {
//                isRequired: true,
//                rules: {
//                    NotBlank: {},
//                    Url: {}
//                }
//            },
//            'table': {
//                isRequired: true,
//                rules: {
//                    NotBlank: {}
//                }
//            },
//            'key': {
//                isRequired: true,
//                rules: {
//                    NotBlank: {}
//                }
//            },
//            'value': {
//                isRequired: true,
//                rules: {
//                    NotBlank: {}
//                }
//            }
//        };
//
//        let response = this.isValid(options, validators);
//        if(response[0] == false){
//            let errors = response[1];
//            for (var errorKey in errors){
//                throw new Error(`Invalid "queryConfiguration" option \"${errorKey}\": ${errors[errorKey].getError()}`);
//            }
//        }
//
//        if(this._entityChoices == null){
////            let _repositoryData = this.getDataFromRepositoryByUrl(repositoryUrl);
//            let _tableData = this._getDataFromArrayByKey(this.clone(_repositoryData), (options.table == '%table%') ? null : options.table);
//
//            let _choices = [];
//
//            if(
//                _v.isArray(_tableData)
//                || _v.isObject(_tableData)
//                || _v.isString(_tableData)
//            ){
//                for (var _tableDataKey in _tableData){
//                    if(!_tableData.hasOwnProperty(_tableDataKey)){
//                        continue;
//                    }
//
//                    let _choiceOption = {};
//                    if(options.key == '%key%'){
//                        _choiceOption['key'] = _tableDataKey.toString();
//                    }else{
//                         _choiceOption['key'] = this._getDataFromArrayByKey(_tableData[_tableDataKey], options.key);
//                     }
//
//                    if(options.value == '%value%'){
//                        _choiceOption['value'] = _tableData[_tableDataKey].toString();
//                    }else{
//                        _choiceOption['value'] = this._getDataFromArrayByKey(_tableData[_tableDataKey], options.value);
//                    }
//
//                    _choices.push(_choiceOption);
//                }
//            }
//
//            this._entityChoices = _choices;
//        }
//
//        return this._entityChoices;
//    }

    generateEntityChoices(options, responseData) {
        let _tableData = this._getDataFromArrayByKey(this.clone(responseData), (options.table == '%table%') ? null : options.table);

        let _choices = [];

        if(
            _v.isArray(_tableData)
            || _v.isObject(_tableData)
            || _v.isString(_tableData)
        ){
            for (var _tableDataKey in _tableData){
                if(!_tableData.hasOwnProperty(_tableDataKey)){
                    continue;
                }

                let _choiceOption = {};
                if(options.key == '%key%'){
                    _choiceOption['key'] = _tableDataKey.toString();
                }else{
                     _choiceOption['key'] = this._getDataFromArrayByKey(_tableData[_tableDataKey], options.key);
                 }

                if(options.value == '%value%'){
                    _choiceOption['value'] = _tableData[_tableDataKey].toString();
                }else{
                    _choiceOption['value'] = this._getDataFromArrayByKey(_tableData[_tableDataKey], options.value);
                }

                _choices.push(_choiceOption);
            }
        }

        return _choices;
    }

    setEntityChoices(options) {
        fetch(options.repositoryUrl)
            .then((response) => response.json())
            .then((responseData) => {
                let _choices = this.generateEntityChoices(options, responseData);

                this._preferredChoices = options.preferredChoices;
                this._entityChoices = _choices;

                this._setState('choices', _choices);

                this.addDataValidationRule('Choice', {
                    'choices': this.getChoiceKeys(),
                    'multiple': false,
                    'strict': true
                });
            })
            .done();
    }

    _getDataFromArrayByKey(data, key) {
        if(key == null){
            return data;
        }

        let _keys = key.split('.');
        let _data = data[_keys[0]];
        _keys.splice(0, 1);

        if(_keys.length > 0) {
            let _keyString = _keys.toString();
            if(_keys.length > 1){
                _keyString = _keys.join('.')
            }

            return this._getDataFromArrayByKey(_data, _keyString);
        }else{
            return _data;
        }
    }
    // ------------------------------------------------------------------------------ Entity Choices

    // Lifecycle Methods ---------------------------------------------------------------------------
    _componentDidMount() {
        let { repositoryUrl, table, key, value, preferredChoices } = (this.getOption('queryConfiguration') ? this.getOption('queryConfiguration') : []);

        let options = {
            'repositoryUrl': repositoryUrl,
            'table': (table != null) ? table : '%table%',
            'key': (key != null) ? key : '%key%',
            'value': (value != null) ? value : '%value%',
            'preferredChoices': (preferredChoices != null) ? preferredChoices : []
        };

        let validators = {
            'repositoryUrl': {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Url: {}
                }
            },
            'table': {
                isRequired: true,
                rules: {
                    NotBlank: {}
                }
            },
            'key': {
                isRequired: true,
                rules: {
                    NotBlank: {}
                }
            },
            'value': {
                isRequired: true,
                rules: {
                    NotBlank: {}
                }
            },
            'preferredChoices': {
                isRequired: true,
                rules: {
                    Type: {
                        'type': 'array'
                    },
//                    @todo: 'Choice' validation for preferredChoices
//                    Choice: {
//                        'choices': this.getChoiceKeys(),
//                        'multiple': true,
//                        'min': 0,
//                        'max': this.getChoiceKeys().length,
//                        'strict': true
//                    }
                }
            }
        };

        let response = this.isValid(options, validators);
        if(response[0] == false){
            let errors = response[1];
            for (var errorKey in errors){
                throw new Error(`Invalid "queryConfiguration" option \"${errorKey}\": ${errors[errorKey].getError()}`);
            }
        }

        this.setEntityChoices(options);
    }
    // --------------------------------------------------------------------------- Lifecycle Methods
}

module.exports = EntityType;