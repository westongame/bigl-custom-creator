import React from 'react';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            editing: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }

        this.setState({
            value: e.currentTarget.value,
        });
    }

    onBlur(e) {
        if (this.props.value !== this.state.value) {
            this.props.update(this.state.value);
        }

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }

        this.setState({
            editing: false,
        });
    }

    onFocus(e) {
        e.currentTarget.select();

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }

        this.setState({
            value: this.props.value,
            editing: true,
        });
    }

    render() {
        return (
            <input
                className={this.props.className}
                type='text'
                placeholder={this.props.placeholder}
                value={this.state.editing ? this.state.value : this.props.value}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}

TextInput.propTypes = {
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    update: React.PropTypes.func,
};
