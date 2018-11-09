import styled from 'styled-components'
import React from 'react'
import {
  Container,
  Heading,
  Text,
  Section,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import RedeemTechDomainForm from 'components/RedeemTechDomainForm'

const Header = styled(Section.withComponent('header'))`
  background-color: ${theme.colors.red[5]};
  background-image: linear-gradient(
    -32deg,
    ${theme.colors.orange[4]},
    ${theme.colors.red[5]},
    ${theme.colors.red[6]}
  );
`

export default () => (
  <>
    <Helmet title="Free .TECH Domain – Hack Club" />
    <Nav />
    <Header align="center" px={0}>
      <Container maxWidth={32} pt={4} px={3}>
        <Heading.h1 fontSize={[5, 6]} mt={0} mb={2}>
          Free .TECH Domain!
        </Heading.h1>
        <Heading fontSize={[3, 4]}>
          Every Hack Club member gets a free .TECH domain from our awesome
          partners.
        </Heading>
        <Text fontSize={3} mt={2} style={{ lineHeight: '1.25' }}>
          Submit your request below and the .TECH team will set you up—it
          generally takes about a day.
        </Text>
      </Container>
    </Header>
    <RedeemTechDomainForm />
  </>
)
