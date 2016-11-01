'use strict';

// Export BobForm
var BobForm = {
    // Text Fields
    get TextType() { return require('./lib/Form/Extension/Core/Type/TextType'); },
    get TextareaType() { return require('./lib/Form/Extension/Core/Type/TextareaType'); },
    get EmailType() { return require('./lib/Form/Extension/Core/Type/EmailType'); },
    get IntegerType() { return require('./lib/Form/Extension/Core/Type/IntegerType'); },
    get MoneyType() { return require('./lib/Form/Extension/Core/Type/MoneyType'); },
    get NumberType() { return require('./lib/Form/Extension/Core/Type/NumberType'); },
    get PasswordType() { return require('./lib/Form/Extension/Core/Type/PasswordType'); },
    get PercentType() { return require('./lib/Form/Extension/Core/Type/PercentType'); },
//    get SearchType() { return require('./lib/Form/Extension/Core/Type/SearchType'); },
    get UrlType() { return require('./lib/Form/Extension/Core/Type/UrlType'); },
    get RangeType() { return require('./lib/Form/Extension/Core/Type/RangeType'); },

    // Choice Fields
    get ChoiceType() { return require('./lib/Form/Extension/Core/Type/ChoiceType'); },
    get CountryType() { return require('./lib/Form/Extension/Core/Type/CountryType'); },
    get LanguageType() { return require('./lib/Form/Extension/Core/Type/LanguageType'); },
    get LocaleType() { return require('./lib/Form/Extension/Core/Type/LocaleType'); },
    get TimezoneType() { return require('./lib/Form/Extension/Core/Type/TimezoneType'); },

};

module.exports = BobForm;
