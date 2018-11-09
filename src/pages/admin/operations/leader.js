import React, { Component } from 'react'
import LoadingBar from 'components/LoadingBar'
import ErrorPage from 'components/admin/ErrorPage'
import Nav from 'components/apply/ApplyNav'
import Helmet from 'react-helmet'
import search from 'search'
import api from 'api'
import { Container, Heading, Text, Link } from '@hackclub/design-system'

export default class extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    const id = search.get('id')
    api
      .get(`v1/new_leaders/${id}`)
      .then(leader => {
        this.setState({ leader, status: 'success' })
      })
      .catch(err => {
        switch (err.status) {
          case 401:
          case 403:
            this.setState({ status: 'needsToAuth' })
            break
          default:
            this.setState({ status: 'error' })
            break
        }
      })
  }

  render() {
    const { status, leader } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <>
            <Nav />
            <Helmet title={`Leader Profile ${leader.id} - ${leader.name}`} />
            <Container color="black" maxWidth={36} py={4}>
              <Heading.h1 fontSize={[5, 6]}>{leader.name}</Heading.h1>
              <Text fontSize={2} color="muted" children={leader.address} />
              <Text fontSize={2} color="muted" children={leader.phone_number} />
              <Link href={`mailto:${leader.email}`}>{leader.email}</Link>
            </Container>
          </>
        )
      case 'error':
        return <ErrorPage />
    }
  }
}
