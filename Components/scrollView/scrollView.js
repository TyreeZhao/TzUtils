import React, { PropTypes } from 'react'
import styles from '../styles.scss'

export class InfinitScrollList extends React.Component {
    static propTypes = {
      cellsHeight: PropTypes.number,
    }

    static defaultProps = {
      cellsHeight: 50,
    }

    constructor(props) {
      super(props)
      this.state = {
        renderElements: null,
        isInitialized: false,
        startIndex: null,
        endIndex: null,
      }
    }

    scrollHandler = () => {
      console.log('scroll~')
      const el = this.selfComponent
      console.log(el.offsetHeight);
      console.log(el.parentNode.scrollTop);
      console.log(this.props.children.length);
      const dismissedCellCount = parseInt(el.parentNode.scrollTop / this.props.cellsHeight)
      let startIndex = dismissedCellCount > 50 ? dismissedCellCount - 50 : 0
      let endIndex = startIndex + 200

      // if ((!endIndex || !startIndex) || (startIndex > this.state.startIndex + 100 ||
      //   endIndex < this.state.endIndex - 100)) {

      let list = []
      for (let i = 0; i < this.props.children.length; i++) {
        if (i < startIndex || i > endIndex) {
          list.push(<div key={i} style={{height: `${this.props.cellsHeight}px`}}/>)
        } else {
          list.push(<div key={i}>{this.props.children[i]}</div>)
        }
      }
      this.setState({
        renderElements: list,
      })
      // }
      // this.setState({
      //   startIndex,
      //   endIndex,
      // })
    }

    componentDidMount () {
        const scrollEl = this.selfComponent.parentNode
        scrollEl.addEventListener('scroll', this.scrollHandler, false)
        scrollEl.addEventListener('resize', this.scrollHandler, false)
        this.scrollHandler()
    }

    componentWillUnmount () {
        console.log('scroll view will un mount');
        const scrollEl = this.selfComponent.parentNode
        scrollEl.removeEventListener('scroll', this.scrollHandler, false)
        scrollEl.removeEventListener('resize', this.scrollHandler, false)
    }

    render () {
        // const {limit, pageStart, threshold, hasMore, autoLoad, useWindow, loadNext, spinLoader, mannualLoader, noMore, children, ...props} = this.props
        //
        // const cloneMannualLoader = React.cloneElement(mannualLoader, {
        //     onClick: () => {
        //         this.setState({
        //             loading: true
        //         })
        //         loadNext(this.page += 1)
        //     }
        // })

        const { children } = this.props

        return (
            <div className={this.props.className} ref={(r) => { this.selfComponent = r }}>
                {this.state.renderElements || null}
            </div>
        )
    }
}

export default InfinitScrollList

