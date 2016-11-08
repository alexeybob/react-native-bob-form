# react-native-bob-form

[Example](#example)

## Built-in Field Types

This package comes standard with a large group of field types that cover all of the common form fields and data types you'll encounter:

#### Text Fields

* **TextType**
* **TextareaType**
* **EmailType**
* **IntegerType**
* **MoneyType**
* **NumberType**
* **PasswordType**
* **PercentType**
* SearchType
* **UrlType**
* **RangeType** - @todo: Slider

#### Choice Fields

* **ChoiceType**
* **EntityType**
* **CountryType**
* **LanguageType**
* **LocaleType**
* **TimezoneType**
* **CurrencyType**

#### Date and Time Fields

* DateType
* DateTimeType
* TimeType
* BirthdayType

#### Other Fields

* **CheckboxType**
* FileType
* **RadioType**

#### Field Groups

* CollectionType
* RepeatedType

#### Hidden Fields

* HiddenType

#### Buttons

* ButtonType
* ResetType
* SubmitType

#### Base Fields

* FormType

---------------

### Example

```javascript
'use strict';

import React, {
    Component,
    PropTypes,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import BobForm, {
    TextType,
    TextareaType,
    EmailType,
    PasswordType,
    UrlType,
    IntegerType,
    NumberType,
    MoneyType,
    PercentType,
    RangeType,

    ChoiceType,
    EntityType,
    CountryType,
    LanguageType,
    LocaleType,
    TimezoneType,
    CurrencyType,

    CheckboxType,
    RadioType
} from 'react-native-bob-form';


import {
    AllValidator,
} from 'bob-validator';

class ReactNativeBobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textType: 'Nullam a mollis elit.',
            textareaType: 'Aliquam convallis vel dolor ac porta. Vestibulum orci ex, ultricies sit amet urna eu, tempor mattis diam. Sed at lectus libero. Aliquam laoreet, erat in cursus pretium, sem purus semper magna, ornare pharetra erat dolor eget mi.',
            emailType: 'alexey.bob@gmail.com',
            passwordType: '123456789',
            urlType: 'https://www.npmjs.com/package/react-native-bob-form',
            integerType: '12548',
            numberType: '12548.25',
            moneyType: '35.28',
            percentType: '.95',
            rangeType: '10',
            choiceType: 'AG',
            countryType: 'US',
            languageType: 'FR',
            localeType: 'en-GB',
            timezoneType: 'Alaskan Standard Time',
            currencyType: 'USD',
            entityType: 'GB',
            checkboxType: '1',
            radioType: '0'
        };
    }

    onChange = (name, value) => {
        this.setState({[name]: value});

        console.log(this.state);
    };

    onValidate = (name, value) => {
        this.setState({[name+'Valid']: value});
    };

    render() {
        return (
            <ScrollView>
                <View style={{'marginTop': 55}}>
                    <CheckboxType
                        options={{'name': 'checkboxType', 'label': 'Checkbox Type', 'data': this.state.checkboxType, 'size': 'medium'}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <RadioType
                        options={{'name': 'radioType', 'label': 'Radio Type', 'data': this.state.radioType, 'size': 'medium'}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <EntityType
                        options={{
                            'name': 'entityType',
                            'label': 'Entity Type',
                            'data': this.state.entityType,
                            'queryConfiguration': {
                                'repositoryUrl': 'https://raw.githubusercontent.com/alexeybob/react-native-bob-form/master/lib/Form/Extension/Core/Data/Test/data2.json',
                                'table': 'countries',
                                'key': '%key%',
                                'value': 'name',
                                'preferredChoices': ['US', 'DE', 'FR']
                            },
                            'attr': {
                                'style': {color: 'black'},
                                'itemStyle': {fontWeight: 'bold'}
                            },
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <CurrencyType
                        options={{
                            'name': 'currencyType',
                            'label': 'Currency Type',
                            'data': this.state.currencyType,
                            'preferredChoices': ['USD', 'CAD', 'EUR'],
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <TimezoneType
                        options={{
                            'name': 'timezoneType',
                            'label': 'Timezone Type',
                            'data': this.state.timezoneType,
                            'preferredChoices': ['Middle East Standard Time', 'E. Europe Standard Time', 'FLE Standard Time'],
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <LocaleType
                        options={{
                            'name': 'localeType',
                            'nameType': 'nativeName',
                            'label': 'Locale Type',
                            'data': this.state.localeType,
                            'preferredChoices': ['de-CH', 'en-GB', 'fr-CA'],
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <LanguageType
                        options={{
                            'name': 'languageType',
                            'nameType': 'name',
                            'label': 'Language Type',
                            'data': this.state.languageType,
                            'preferredChoices': ['FR', 'DE', 'EN'],
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <CountryType
                        options={{
                            'name': 'countryType',
                            'nameType': 'name',
                            'label': 'Country Type',
                            'data': this.state.countryType,
                            'preferredChoices': ['AU', 'GB', 'US'],
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <ChoiceType
                        options={{
                            'name': 'choiceType',
                            'label': 'Choice Type',
                            'data': this.state.choiceType,
                            'choices': [
                                {'key': 'AF', 'value': 'Afghanistan'},
                                {'key': 'AL', 'value': 'Albania'},
                                {'key': 'DZ', 'value': 'Algeria'},
                                {'key': 'AS', 'value': 'American Samoa'},
                                {'key': 'AD', 'value': 'Andorra'},
                                {'key': 'AO', 'value': 'Angola'},
                                {'key': 'AI', 'value': 'Anguilla'},
                                {'key': 'AQ', 'value': 'Antarctica'},
                                {'key': 'AG', 'value': 'Antigua & Barbuda'},
                                {'key': 'AR', 'value': 'Argentina'},
                                {'key': 'AM', 'value': 'Armenia'},
                                {'key': 'AW', 'value': 'Aruba'},
                                {'key': 'AC', 'value': 'Ascension Island'},
                                {'key': 'AU', 'value': 'Australia'},
                                {'key': 'AT', 'value': 'Austria'},
                                {'key': 'AZ', 'value': 'Azerbaijan'},
                                {'key': 'BS', 'value': 'Bahamas'}
                            ],
                            'preferredChoices': ['AT', 'AQ', 'BS'],
                            'attr': {
                                'style': {color: 'black'},
                                'itemStyle': {fontWeight: 'bold'}
                            },
                            'placeholder': 'Please select ...'
                        }}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <TextType
                        options={{'name': 'textType', 'label': 'Text Type', 'data': this.state.textType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <TextareaType
                        options={{'name': 'textareaType', 'label': 'Textarea Type', 'data': this.state.textareaType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <EmailType
                        options={{'name': 'emailType', 'label': 'Email Type', 'data': this.state.emailType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <PasswordType
                        options={{'name': 'passwordType', 'label': 'Password Type', 'data': this.state.passwordType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <UrlType
                        options={{'name': 'urlType', 'label': 'Url Type', 'data': this.state.urlType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <IntegerType
                        options={{'name': 'integerType', 'label': 'Integer Type', 'data': this.state.integerType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <NumberType
                        options={{'name': 'numberType', 'label': 'Number Type', 'data': this.state.numberType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <MoneyType
                        options={{'name': 'moneyType', 'label': 'Money Type', 'data': this.state.moneyType, 'currency': 'USD'}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <PercentType
                        options={{'name': 'percentType', 'label': 'Percent Type', 'data': this.state.percentType}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                    <RangeType
                        options={{'name': 'rangeType', 'label': 'Range Type', 'data': this.state.rangeType, 'minimumValue': 10, 'maximumValue': 100}}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default ReactNativeBobForm;
```