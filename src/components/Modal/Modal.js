import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

class Modal extends Component {
  constructor() {
    super();
    this.node = document.createElement('div');
  }

  componentDidMount() {
    if (this.node) {
      document.body.appendChild(this.node);
    }
  }

  componentWillUnmount() {
    if (this.node) {
      document.body.removeChild(this.node);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen === this.props.isOpen) return;

    if (this.props.isOpen) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = '';
    }
  }

  closeModal = () => {
    this.toggleScrollLock();
    this.props.onClose();
  };
  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal(event);
    }
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    const { isOpen, title, children, className } = this.props;
    const classNames = cx(
      className,
      'modal opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center'
    );
    if (!isOpen) return <></>;
    return ReactDOM.createPortal(
      <FocusTrap>
        <aside
          tag="aside"
          role="dialog"
          tabIndex="-1"
          aria-modal="true"
          className={classNames}
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onKeyDown={this.onKeyDown}
        >
          <div
            className="modal-container relative bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
            ref={n => (this.modal = n)}
          >
            <button
              type="button"
              className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50"
              onClick={this.closeModal}
            >
              <svg
                id="close-modal-cross-icon"
                aria-label="Close Modal"
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
              <span className="text-sm">(Esc)</span>
            </button>

            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">{title}</p>
              </div>

              {children}
            </div>
          </div>
        </aside>
      </FocusTrap>,
      this.node
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  onClose: PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
  title: '',
  className: '',
  children: [],
  onClose: () => {}
};

export { Modal };
