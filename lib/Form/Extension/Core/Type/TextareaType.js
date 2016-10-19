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

    setElementHeight(height) {
        super._setState('height', height);
    }

    _onChange(event) {
        this.setElementHeight(event.nativeEvent.contentSize.height);
    }

    _componentDidMount(){
        this.setTimeout( () => {
            this.refs[this.getOption('name')].measure(
                (ox, oy, width, height) => {
                    this.setElementHeight(height);
                }
            )
        }, 500 );
    }
}

module.exports = TextareaType;