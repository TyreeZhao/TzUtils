import React, {PropTypes} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import {Header} from '../Header'
import styles from './styles.scss'

type Props = {
  className: PropTypes.string,
  push: PropTypes.func,
  pop: PropTypes.func,
  headerTitle: PropTypes.string,
  elementLeft: PropTypes.node,
  elementRight: PropTypes.node,
  children: PropTypes.node,
  headerChildren: PropTypes.node,
  headerLeftLabel: PropTypes.string,
  onClickHeaderLeft: PropTypes.func,
  headerRightLabel: PropTypes.string,
  onClickHeaderRight: PropTypes.func,
}

export class NavigationController extends React.Component {

  state = {
    action: 'PUSH',
    animation: false,
    viewLength: 0,
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      action: props.children.length > this.state.viewLength ? 'PUSH' : 'POP',
    })
    this.setState({
      viewLength: props.children.length,
    })
  }

  getHeaderTitle = () => {
    const {action} = this.state
    const {children, headerTitle} = this.props

    const enterClass = {
      PUSH: styles.headerEnterFromRight,
      POP: styles.headerEnterFromLeft,
    }[action]
    const leaveClass = {
      PUSH: styles.headerLeaveToLeft,
      POP: styles.headerLeaveToRight,
    }[action]
    const header = (<div key={children}>{headerTitle}</div>)
    return (
      <ReactCSSTransitionGroup
        className={styles.mainElement}
        transitionName={{
          enter: enterClass,
          leave: leaveClass,
        }}
        transitionAppear={false}
        transitionEnter
        transitionEnterTimeout={0}
        transitionLeave
        transitionLeaveTimeout={0}
        component="div"
      >{header}
      </ReactCSSTransitionGroup>
    )
  }

  render() {
    const {action} = this.state
    const {children} = this.props

    const headerElementLeft = (
      <div className={styles.headerLfBtn} onClick={this.props.onClickHeaderLeft}>
        <div className={styles.icon}>{this.props.elementLeft}</div>
        <ReactCSSTransitionGroup
          className={styles.label}
          transitionName={{
            enter: styles.headerLabel,
          }}
          transitionAppear={false}
          transitionEnter
          transitionEnterTimeout={0}
          transitionLeave={false}
          transitionLeaveTimeout={0}
          component="div"
        >{<div key={children}>{this.props.headerLeftLabel}</div> || <div/>}
        </ReactCSSTransitionGroup>
      </div>
    )

    const headerElementRight = (
      <div className={styles.headerRtBtn} onClick={this.props.onClickHeaderRight}>
        <ReactCSSTransitionGroup
          className={styles.label}
          transitionName={{
            enter: styles.headerLabel,
          }}
          transitionAppear={false}
          transitionEnter
          transitionEnterTimeout={0}
          transitionLeave={false}
          transitionLeaveTimeout={0}
          component="div"
        >{<div key={children}>{this.props.headerRightLabel}</div> || <div/>}
        </ReactCSSTransitionGroup>
        <div className={styles.icon}>{this.props.elementRight}</div>
      </div>
    )

    const enterClass = {
      PUSH: styles.enterFromRight,
      POP: styles.enterFromLeft,
    }[action]
    const leaveClass = {
      PUSH: styles.leaveToLeft,
      POP: styles.leaveToRight,
    }[action]

    return (
      <div className={classnames(styles.container, this.props.className)}>
        <div className={styles.header}>
          {headerElementLeft}
          {this.getHeaderTitle()}
          {headerElementRight}
        </div>
        {this.props.headerChildren}
        <ReactCSSTransitionGroup
          className={styles.container}
          transitionName={{
            enter: enterClass,
            leave: leaveClass,
          }}
          transitionAppear={false}
          transitionEnter
          transitionEnterTimeout={0}
          transitionLeave
          transitionLeaveTimeout={0}
          component="div"
        >
          {this.props.children[this.props.children.length - 1] || <div/>}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
export default NavigationController
