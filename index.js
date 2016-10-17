'use strict';

// Export BobForm
var BobForm = {
    // Types
    get TextType() { return require('./lib/Form/Extension/Core/Type/TextType'); },
//    get TextareaType() { return require('./lib/Form/Extension/Core/Type/TextareaType'); },
    get EmailType() { return require('./lib/Form/Extension/Core/Type/EmailType'); },
};


module.exports = BobForm;
