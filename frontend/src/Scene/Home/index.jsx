import { connect } from 'react-redux'
import Layout from './layout'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    SchoolChainCore: state.contracts.SchoolChainCore
  }
}


export default connect()(drizzleConnect(Layout, mapStateToProps))