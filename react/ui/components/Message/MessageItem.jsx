
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class MessageItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible : false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ visible: true }), 50);
  }

  render() {
    const { content, theme, ...others } = this.props;

    let wrapClass = classnames({
      'ui-message-wrapper': true,
      'ui-message-visible': this.state.visible
    });

    let iconClass = classnames({
      [`ui-message-${theme}`]: !!theme,
    });

    let iconType = 'info-round';

    switch(theme) {
      case 'warning':
        iconType = 'warning-round';
        break;
      case 'success':
        iconType = 'right-round';
        break;
      case 'error':
        iconType = 'wrong-round';
        break;
    }

    return (
      <div className={wrapClass} {...others}>
          <div className="ui-message-container">
            <Icon type={iconType} className={iconClass} style={{fontSize: 15}} />
            {content}
          </div>
        </div>
    );
  }
}

export default MessageItem;
