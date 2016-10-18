'use strict';

import BaseTextType from './Base/BaseTextType';

class TextareaType extends BaseTextType {
    constructor(props) {
        super(props);

    }

    getDefaultKeyboardType() {
        return 'default';
    }

    configureOptions() {
        let { autoheight } = this.props.options;

        this.addOption('autoheight', (autoheight != null) ? autoheight : true, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        super.configureOptions();
    }

    configureAttrOptions() {

        // multiline
        this.addAttrOption('multiline', true, {
            isRequired: true,
            rules: {
                NotBlank: {},
                Type: {
                    'type': 'bool'
                }
            }
        });

        super.configureAttrOptions();
    }

    _onChange(event) {
        super._setState('height', event.nativeEvent.contentSize.height);
    }

}

module.exports = TextareaType;