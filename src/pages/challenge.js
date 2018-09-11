import React, { Fragment, Component } from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  Section,
  Link,
  Card,
  Button,
  Icon,
  Image
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import IconButton from 'components/IconButton'
import Help from 'components/challenge/Help'
import Form from 'components/challenge/Form'
import Ended from 'components/challenge/Ended'
import Posts from 'components/challenge/Posts'
import DiscussChallenge from 'components/challenge/DiscussChallenge'
import {
  DropdownContainer,
  DropdownMenu,
  DropdownMenuOption
} from 'components/Dropdown'
import { dt, tinyDt } from 'helpers'
import { isEmpty, keys } from 'lodash'
import api from 'api'
import storage from 'storage'

const sortByHumanized = {
  trending: 'Trending',
  top: 'Top-voted',
  newest: 'Newest',
  viewed: 'Top-viewed',
  random: 'Random'
}

const Header = Section.withComponent('header').extend`
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: linear-gradient(
    32deg,
    ${({ theme }) => theme.colors.pink[5]},
    ${({ theme }) => theme.colors.red[5]}
  );
`

const HeaderContainer = Container.extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  grid-template-areas: 'text' 'info' 'form';
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${({ theme }) => theme.space[4]}px;
      ${props =>
        props.success
          ? css`
              grid-template-areas:
                'text form'
                'info form';
              ${HeaderAreaText} {
                text-align: right;
              }
            `
          : css`
              grid-template-areas:
                'text text'
                'info form';
            `};
    }
  }
`

const HeaderCard = styled(Card)`
  h2,
  p {
    color: ${({ theme }) => theme.colors.black} !important;
  }
`
HeaderCard.defaultProps = {
  boxShadowSize: 'md',
  p: 3,
  bg: 'pink.0',
  align: 'left'
}

const HeaderAreaText = styled(Box)`
  grid-area: text;
`
const HeaderAreaInfo = styled(HeaderCard)`
  grid-area: info;
`
const HeaderAreaForm = styled(HeaderCard)`
  grid-area: form;
`

const Title = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
`

const title = 'Hack Club Challenge'
const desc =
  'Join Hack Club’s high school coding challenge. Submit your entry to compete in our monthly programming contest and win prizes.'
const img = 'https://hackclub.com/challenge.png'

export default class extends Component {
  state = { status: 'loading', sortBy: 'top' }

  componentDidMount() {
    if (storage.get('authToken')) {
      api
        .get(`v1/users/current`)
        .then(user => {
          this.setState({ status: 'success', userId: user.id })
        })
        .catch(err => {
          if (err.status === 401) {
            this.setState({ status: 'needsToAuth' })
          } else {
            this.setState({ status: 'error' })
          }
        })
    } else {
      this.setState({ status: 'needsToAuth' })
    }
  }

  render() {
    const { data } = this.props
    const { userId, status, sortBy } = this.state
    if (isEmpty(data)) return null
    const challenge = data.allChallengesJson.edges[0].node
    const ended = Date.parse(new Date()) > Date.parse(challenge.end)
    return (
      <Fragment>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: desc },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: desc },
            { name: 'twitter:image', content: img },
            { property: 'og:title', content: title },
            { property: 'og:description', content: desc },
            { property: 'og:image', content: img },
            { property: 'og:url', content: 'https://hackclub.com/challenge' }
          ]}
        />
        <Nav />
        <Header py={0} px={3}>
          <HeaderContainer
            pt={[4, 5]}
            pb={[3, 4]}
            align="left"
            success={status === 'success'}
          >
            <HeaderAreaText align="center" mt={3}>
              <Text color="pink.0" mb={[-2, -3]} f={3} bold caps>
                Hack Club
              </Text>
              <Heading.h1 f={[6, 7]} my={0}>
                Challenge
              </Heading.h1>
            </HeaderAreaText>
            <HeaderAreaInfo>
              <Text f={2}>
                🌟 Challenge: <strong>{challenge.name}</strong>
                <br />
                🎁 {challenge.description}
                <br />
                ℹ️ Submissions open to Hack Club community members
                <br />
                📖{' '}
                <Link
                  href="/workshops/challenge_ridiculous_api"
                  target="_blank"
                  underline
                >
                  Click here
                </Link>{' '}
                for help getting started
                <br />
                🏅 Submissions due {dt(challenge.end)}. Top 3 voted win!
              </Text>
            </HeaderAreaInfo>
            <HeaderAreaForm>
              <Help />
              <Form challengeId={challenge.id} status={status} />
            </HeaderAreaForm>
          </HeaderContainer>
        </Header>
        <Container maxWidth={48} pt={4} pb={5} px={[0, 3]}>
          {ended && <Ended />}
          <Title align="center" pb={2} px={[2, 0]}>
            <Flex align="center" flex="1 1 auto" wrap>
              <Heading.h2 color="black" f={5} mr={2}>
                Submissions
              </Heading.h2>
              <Text f={2} color="muted" align="left">
                {tinyDt(challenge.start)}–{tinyDt(challenge.end)}
              </Text>
            </Flex>
            <DropdownContainer>
              <IconButton
                name="sort"
                size={16}
                bg="info"
                f={2}
                style={{ whiteSpace: 'nowrap' }}
                children={sortByHumanized[sortBy]}
              />
              <DropdownMenu>
                {keys(sortByHumanized).map(key => (
                  <DropdownMenuOption
                    active={sortBy === key}
                    onClick={() => this.setState({ sortBy: key })}
                    children={sortByHumanized[key]}
                    key={key}
                  />
                ))}
              </DropdownMenu>
            </DropdownContainer>
          </Title>
          <Posts
            challengeId={challenge.id}
            userId={userId}
            status={status}
            sortBy={sortBy}
          />
          <DiscussChallenge />
        </Container>
        <Footer />
      </Fragment>
    )
  }
}
export const pageQuery = graphql`
  query ChallengeQuery {
    allChallengesJson(
      filter: { name: { ne: "T-Shirt" } }
      sort: { fields: [start], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          name
          description
          start
          end
        }
      }
    }
  }
`
