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
    get EntityType() { return require('./lib/Form/Extension/Core/Type/EntityType'); },
    get CountryType() { return require('./lib/Form/Extension/Core/Type/CountryType'); },
    get LanguageType() { return require('./lib/Form/Extension/Core/Type/LanguageType'); },
    get LocaleType() { return require('./lib/Form/Extension/Core/Type/LocaleType'); },
    get TimezoneType() { return require('./lib/Form/Extension/Core/Type/TimezoneType'); },
    get CurrencyType() { return require('./lib/Form/Extension/Core/Type/CurrencyType'); },
    get CheckboxGroupType() { return require('./lib/Form/Extension/Core/Type/CheckboxGroupType'); },

    // Date and Time Fields
//    get DateType() { return require('./lib/Form/Extension/Core/Type/DateType'); },
//    get DateTimeType() { return require('./lib/Form/Extension/Core/Type/DateTimeType'); },
//    get TimeType() { return require('./lib/Form/Extension/Core/Type/TimeType'); },
//    get BirthdayType() { return require('./lib/Form/Extension/Core/Type/BirthdayType'); },

    // Other Fields
    get CheckboxType() { return require('./lib/Form/Extension/Core/Type/CheckboxType'); },
//    get FileType() { return require('./lib/Form/Extension/Core/Type/FileType'); },
    get RadioType() { return require('./lib/Form/Extension/Core/Type/RadioType'); },

    // Field Groups
//    get CollectionType() { return require('./lib/Form/Extension/Core/Type/CollectionType'); },
//    get RepeatedType() { return require('./lib/Form/Extension/Core/Type/RepeatedType'); },

    // Hidden Fields
//    get HiddenType() { return require('./lib/Form/Extension/Core/Type/HiddenType'); },

    // Buttons
//    get ButtonType() { return require('./lib/Form/Extension/Core/Type/ButtonType'); },
//    get ResetType() { return require('./lib/Form/Extension/Core/Type/ResetType'); },
//    get SubmitType() { return require('./lib/Form/Extension/Core/Type/SubmitType'); },

    // Base Fields
//    get FormType() { return require('./lib/Form/Extension/Core/Type/FormType'); },
};

module.exports = BobForm;
