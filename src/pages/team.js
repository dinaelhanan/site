import React from 'react'
import styled from 'styled-components'
import {
  Section,
  Heading,
  Text,
  Container,
  Button,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import BG from 'components/BG'
import Nav from 'components/Nav'
import Name from 'components/Name'
import Bio from 'components/Bio'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'

const Header = styled(Section)`
  background: url('/pattern.svg'),
    linear-gradient(-64deg, ${theme.colors.orange[5]}, ${theme.colors.red[5]});
  background-repeat: repeat;
`

const Base = styled(Container)`
  display: grid;
  grid-gap: 1rem;
  ${theme.mediaQueries.md} {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Updates = styled(Sheet)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  align-items: flex-start;
  ${theme.mediaQueries.md} {
    grid-template-columns: 1fr auto;
  }
`
const UpdateLink = styled(Button.withComponent(Link)).attrs({
  scale: true,
  chevronRight: true,
  bg: 'info',
  color: 'white',
  py: 3,
  px: 4,
  fontSize: 2
})`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.cyan[6]},
    ${theme.colors.blue[6]}
  );
`

const title = 'Hack Club Team'
const description =
  'Meet the team that runs Hack Club, a global nonprofit network of high school computer science clubs.'

export default () => (
  <>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/team' }
      ]}
    />
    <BG color="snow" />
    <Nav />
    <Header color="white">
      <Container maxWidth={36} align="center" py={[3, 4]}>
        <Heading.h1 fontSize={[3, 4]} regular caps mt={4} mb={2}>
          Hack Club Team
        </Heading.h1>
        <Name fontSize={6}>We the students.</Name>
        <Text fontSize={3} my={3}>
          We believe in a world where every young person is empowered to be the
          change they want to see around them. At Hack Club, we’re working hard
          to make it reality.
        </Text>
      </Container>
    </Header>
    <Base px={3} py={[4, 5]}>
      <Bio
        img="/team/zach.jpg"
        name="Zach Latta"
        role="Executive Director"
        text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
        pronouns="he/him"
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        role="Operations"
        text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
        pronouns="he/him"
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web/Design"
        text="Lachlan, a club leader from State College, PA, joined to work on hackclub.com. Over a year later, they now manage Hack Club’s design and branding, and build the website and Design System."
        pronouns="they/them"
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        role="Community"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from engaging more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
        pronouns="he/him"
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India, where he actively leads over a dozen clubs."
        pronouns="he/him"
      />
      <Bio
        img="/team/orpheus.jpg"
        name="Prophet Orpheus"
        role="Mascot"
        text="Prophet Orpheus is Hack Club’s mascot who takes the form of a nondescript dinosaur. She is always working to help more students to learn to code, and has always been the most active contributor of Hack Club."
        pronouns="she/her"
      />
    </Base>
    <Updates maxWidth={48} align="left" bg="black">
      <Container maxWidth={32} mx={0}>
        <Heading.h2 fontSize={[3, 4]} color="white">
          What’ve we been doing recently?
        </Heading.h2>
        <Text color="smoke">
          Check out our latest update videos to see our work.
        </Text>
      </Container>
      <UpdateLink to="/updates">Watch now</UpdateLink>
    </Updates>
    <Footer />
  </>
)
