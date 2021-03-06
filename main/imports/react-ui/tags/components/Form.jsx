import React, { PropTypes, Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Alert from 'meteor/erxes-notifier';


const propTypes = {
  tag: PropTypes.object,
  type: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};

const contextTypes = {
  closeModal: PropTypes.func.isRequired,
};

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    const { tag } = props;

    this.state = {
      name: tag ? tag.name : '',
      colorCode: tag ? tag.colorCode : this.generateRandomColorCode(),
    };

    this.submit = this.submit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleColorCode = this.handleColorCode.bind(this);
  }

  generateRandomColorCode() {
    return `#${Math.random().toString(16).slice(2, 8)}`;
  }

  submit(e) {
    e.preventDefault();

    const { type, submit } = this.props;
    const { name, colorCode } = this.state;

    submit({ name, type, colorCode }, error => {
      if (error) {
        return Alert.error('Error', error.reason);
      }

      Alert.success('Success', 'Successfully saved');
      return this.context.closeModal();
    });
  }

  handleName(e) {
    this.setState({ name: e.target.value });
  }

  handleColorCode(e) {
    this.setState({ colorCode: e.target.value });
  }

  render() {
    const { name, colorCode } = this.state;

    return (
      <form onSubmit={this.submit}>
        <FormGroup controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={name}
            onChange={this.handleName}
            required
          />
        </FormGroup>

        <FormGroup controlId="colorCode">
          <ControlLabel>Color code</ControlLabel>
          <FormControl
            type="color"
            value={colorCode}
            onChange={this.handleColorCode}
          />
        </FormGroup>

        <Button type="submit">Save</Button>
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.contextTypes = contextTypes;

export default Form;
