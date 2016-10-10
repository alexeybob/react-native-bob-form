'use strict';

import React, {
    Component,
    PropTypes,
    View,
    Text,
    TextInput
} from 'react-native';

import BaseType from './BaseType';

class BaseTextType extends BaseType {
    constructor(props) {
        super(props);

        this.labelName = (<Text>{this.props.options.labelName}</Text>);
        this.field = (<TextInput keyboardType="default" ref="{this.props.options.name}"/>);
        this.error = (<Text>Erorr Message</Text>);

        this.options = {
            'name': this.props.options.name,
            'data': this.props.options.data ? this.props.options.data : null,
            'disabled': this.props.options.disabled ? this.props.options.disabled : false,
            'empty_data': this.props.options.empty_data ? this.props.options.empty_data : '',
            'label': this.props.options.label,
            'label_attr': this.props.options.label_attr ? this.props.options.label_attr : {},
            'required': this.props.options.required ? this.props.options.required : true,
            'trim': this.props.options.trim ? this.props.options.trim : false
        }

        console.log(this.options);

        this.optionValidationSchema = {
            name: {
                isRequired: true,
                rules: {
                    NotBlank: {},
                    Length: {
                        'min': 1,
                        'max': 255
                    },
                    Type: {
                        'type': 'alpha'
                    }
                }
            },
            data: {
                isRequired: false,
                rules: {
                    Length: {
                        'min': 1,
                        'max': 255
                    },
                    Type: {
                        'type': 'string'
                    }
                }
            },
            disabled: {
                isRequired: true,
                rules: {
                    Type: {
                        'type': 'bool'
                    }
                }
            },
            empty_data: {
                isRequired: false,
                rules: {
                    Length: {
                        'min': 1,
                        'max': 255
                    },
                    Type: {
                        'type': 'string'
                    }
                }
            },
            label: {
                isRequired: true,
                rules: {
                    Length: {
                        'min': 1,
                        'max': 255
                    },
                    Type: {
                        'type': 'alnum'
                    }
                }
            },
            label_attr: {
                isRequired: true,
                rules: {
                    Type: {
                        'type': 'object'
                    }
                }
            },
            required: {
                isRequired: true,
                rules: {
                    Type: {
                        'type': 'bool'
                    }
                }
            },
            trim: {
                isRequired: true,
                rules: {
                    Type: {
                        'type': 'bool'
                    }
                }
            }
        };

        this.isValid(this.options, this.optionValidationSchema);
    }

    getRenderFormat() {
        var labelName = this.labelName;
        var field = this.field;
        var error = this.error;

        return (
           <View>
               <View>
                    {labelName}
               </View>
               <View>
                   {field}
               </View>
               <View>
                   {error}
               </View>
           </View>
        );
    }
}

BaseTextType.propTypes = {
    options: PropTypes.object.isRequired
};

module.exports = BaseTextType;