'use strict';

// Export BobForm
var BobForm = {
    // Types
    get TextType() { return require('./lib/Form/Extension/Core/Type/TextType'); },
    get TextareaType() { return require('./lib/Form/Extension/Core/Type/TextareaType'); },
    get EmailType() { return require('./lib/Form/Extension/Core/Type/EmailType'); },
//    get IntegerType() { return require('./lib/Form/Extension/Core/Type/IntegerType'); },
//    get MoneyType() { return require('./lib/Form/Extension/Core/Type/MoneyType'); },
//    get NumberType() { return require('./lib/Form/Extension/Core/Type/NumberType'); },
    get PasswordType() { return require('./lib/Form/Extension/Core/Type/PasswordType'); },
//    get PercentType() { return require('./lib/Form/Extension/Core/Type/PercentType'); },
//    get SearchType() { return require('./lib/Form/Extension/Core/Type/SearchType'); },
    get UrlType() { return require('./lib/Form/Extension/Core/Type/UrlType'); },
//    get RangeType() { return require('./lib/Form/Extension/Core/Type/RangeType'); },




};


module.exports = BobForm;
