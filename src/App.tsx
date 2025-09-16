import React from 'react'
import './App.css'

import {
  Box,
  Button,
  Card,
  Container,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";

const NBSP = '\u00A0';

// Timeframes
const RELEASED_2_YEARS_AGO = 'Released two years ago';
const RELEASED_15_YEARS_AGO = 'Released fifteen years ago';
const CONVICTED_20_YEARS_AGO_SERVED_15_YEARS = 'Convicted 20 years ago; served 15 years';
const CONVICTED_20_YEARS_AGO_SERVED_2_YEARS = 'Convicted 20 years ago; served 2 years';
const CONVICTED_5_YEARS_AGO_SERVED_1_YEAR = 'Convicted 5 years ago; served 1 year';
const CONVICTED_4_YEARS_AGO = 'Convicted 4 years ago';
const CONVICTED_10_YEARS_AGO_SERVED_4_YEARS = 'Convicted 10 years ago; served 4 years';

// Identities
const  DEFENDANT_IN_CRIMINAL_CASE = 'Defendant in criminal case';
const  DEFENDANT_IN_CIVIL_CASE = 'Defendant in civil case';
const  WITNESS_IN_CIVIL_CASE = 'Witness in civil case';
const  NON_DEFENDANT_WITNESS_IN_CRIMINAL_CASE = 'Non-defendant witness in criminal case';
const  VICTIM_IN_CRIMINAL_CASE = 'Victim in criminal case';
const  PLAINTIFF_IN_CIVIL_CASE = 'Plaintiff in civil case';

// Seriousness of Convictions
const  FELONY = 'Felony';
const  MISDEMEANOR = 'Misdemeanor';

// Types of Convictions
const  ROBBERY = 'Robbery';
const  EMBEZZLEMENT = 'Embezzlement';
const  THEFT = 'Theft';
const  MURDER = 'Murder';
const  PERJURY = 'Perjury';
const  FRAUD = 'Fraud';

// Pardoning
const NOT_PARDONED = 'Not pardoned';
const PARDONED_FOR_INNOCENCE = 'Pardoned for innocence';

// Juvenile Status
const JUVENILE = 'Juvenile at time of prior convicted crime';
const NOT_JUVENULE = 'Not juvenile at time of prior convicted crime';

const TIMEFRAMES = [
  RELEASED_2_YEARS_AGO,
  RELEASED_15_YEARS_AGO,
  CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
  CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
  CONVICTED_5_YEARS_AGO_SERVED_1_YEAR,
  CONVICTED_4_YEARS_AGO,
  CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
];

const IDENTITIES = [
  DEFENDANT_IN_CRIMINAL_CASE,
  DEFENDANT_IN_CIVIL_CASE,
  WITNESS_IN_CIVIL_CASE,
  NON_DEFENDANT_WITNESS_IN_CRIMINAL_CASE,
  VICTIM_IN_CRIMINAL_CASE,
  PLAINTIFF_IN_CIVIL_CASE,
];

const SERIOUSNESSES_OF_CONVICTIONS = [
  FELONY,
  MISDEMEANOR,
]
const TYPES_OF_CONVICTIONS = [
  ROBBERY,
  EMBEZZLEMENT,
  THEFT,
  MURDER,
  PERJURY,
  FRAUD,
];

// Make this less likely
const PARDONING = [
  NOT_PARDONED,
  NOT_PARDONED,
  NOT_PARDONED,
  PARDONED_FOR_INNOCENCE,
];

// Make this less likely
const JUVENILE_STATUS = [
  JUVENILE,
  JUVENILE,
  JUVENILE,
  NOT_JUVENULE,
];

const getRandomElement = (arr: string[]) => (
  arr[Math.floor(Math.random()*arr.length)]
)

const getOutcome = (
  {
    identity,
    juvenileStatus,
    pardoning,
    seriousness,
    timeframe,
    typeOfConviction,
  }
  : {
    identity: string,
    juvenileStatus: string,
    pardoning: string,
    seriousness: string,
    timeframe: string,
    typeOfConviction: string,
  }
) => {
  if (pardoning === PARDONED_FOR_INNOCENCE) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (juvenileStatus === JUVENILE && identity === DEFENDANT_IN_CRIMINAL_CASE) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (juvenileStatus === JUVENILE) {
    return { text: "Admit in a crimincal case IF admission would be admissable against and adult AND the evidence is necessary to fairly determine the guilt or innocence", color: "orange" };
  } else if (
    seriousness === MISDEMEANOR
    &&
    [
      RELEASED_2_YEARS_AGO,
      RELEASED_15_YEARS_AGO,
      CONVICTED_5_YEARS_AGO_SERVED_1_YEAR,
      CONVICTED_4_YEARS_AGO,
    ].includes(timeframe)
    && [
      ROBBERY,
      THEFT,
      MURDER,
    ].includes(typeOfConviction)
  ) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (
    [
      CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
      RELEASED_15_YEARS_AGO,
    ].includes(timeframe)) {
    return { text: "Exclude unless probative value substantially outweighs prejudicial effect.", color: "orange" };
  } else if (
    ([
      CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
      CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
      CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
    ].includes(timeframe)
      || seriousness === FELONY)
    && [
      ROBBERY,
      THEFT,
      MURDER,
    ].includes(typeOfConviction)
    && identity === DEFENDANT_IN_CRIMINAL_CASE
  ) {
    return { text: "Admit if probative value substantially outweighs prejudicial effect.", color: "yellow" };
  } else if (
    ([
      CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
      CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
      CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
    ].includes(timeframe)
      || seriousness === FELONY)
    && [
      ROBBERY,
      THEFT,
      MURDER,
    ].includes(typeOfConviction)
    && identity !== DEFENDANT_IN_CRIMINAL_CASE
  ) {
    return { text: "Admit unless Rule 403 (unfair prejudice substantially outweighs probative value) dictates exclusion", color: "yellow" };
  } else if (
    [
      EMBEZZLEMENT,
      FRAUD,
      PERJURY,
    ].includes(typeOfConviction)
  ) {
    return { text: "Automatically admit. No balancing test - not even Rule 403 - applies.", color: "green" }
  } else {
    return { text: "Missing outcome...", color: "gray" }
  }
}

const OptionCard = ({color, title, value}: { color: string, title: string, value: string }) => (
  <Card size="2" className={`card card-${color}`} >
    <Box>
      <Text as="div" size="3" align="center" weight="bold">
        {title}
      </Text>
      <Text as="div" size="2" m="1" align="center">
        {value}
      </Text>
    </Box>
  </Card>
)


function App() {
  const [timeframe, setTimeframe] = React.useState(NBSP);
  const [identity, setIdentity] = React.useState(NBSP);
  const [seriousness, setSeriousness] = React.useState(NBSP);
  const [typeOfConviction, setTypeOfConviction] = React.useState(NBSP);
  const [pardoning, setPardoning] = React.useState(NBSP);
  const [juvenileStatus, setJuvenileStatus] = React.useState(NBSP);
  const [outcomeVisible, setOutcomeVisible] = React.useState(false);
  const [outcomeButtonVisible, setOutcomeButtonVisible ] = React.useState(false);

  const outcome = getOutcome({
    identity,
    juvenileStatus,
    pardoning,
    seriousness,
    timeframe,
    typeOfConviction,
  });

  const randomize = () => {
    setTimeframe(getRandomElement(TIMEFRAMES));
    setIdentity(getRandomElement(IDENTITIES));
    setSeriousness(getRandomElement(SERIOUSNESSES_OF_CONVICTIONS));
    setTypeOfConviction(getRandomElement(TYPES_OF_CONVICTIONS));
    setPardoning(getRandomElement(PARDONING));
    setJuvenileStatus(getRandomElement(JUVENILE_STATUS));
    setOutcomeVisible(false);
    setOutcomeButtonVisible(true);
  };

  return (
    <>
      <a id="github-link" href="https://www.github.com/zack/rule609" aria-label="View GitHub">
        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          >
          </path>
        </svg>
      </a>

      <Container size="2">
        <Heading size="8" weight="bold">
          Rule 609 Game
        </Heading>

        <Heading size="4" m="4" weight="regular">
          How well do you know <Link href="https://www.law.cornell.edu/rules/fre/rule_609"> Federal Rules of Evidence Rule 609 </Link>?
        </Heading>

        <Button variant="surface" m="4" size="3" onClick={randomize}>
          <Box m="8">
            <Text size="4" weight="bold">
              Randomize
            </Text>
          </Box>
        </Button>

        <OptionCard color="red" title="Identity of Witness" value={identity}/>
        <OptionCard color="orange" title="Seriousness of Crime" value={seriousness}/>
        <OptionCard color="yellow" title="Type of Conviction" value={typeOfConviction}/>
        <OptionCard color="green" title="Time Since Conviction or Release" value={timeframe}/>
        <OptionCard color="blue" title="Pardoning" value={pardoning}/>
        <OptionCard color="purple" title="Juvenile Status" value={juvenileStatus}/>

        {
          outcomeButtonVisible &&
            <Button variant="surface" m="4" size="3" onClick={() => setOutcomeVisible(true)}>
              <Box m="8">
                <Text size="4" weight="bold">
                  Display Outcome
                </Text>
              </Box>
            </Button>
        }

        {outcomeVisible &&
          <Card size="4" className={`card card-${outcome.color}`} >
            <Box>
              <Text align="center"> {outcome.text} </Text>
            </Box>
          </Card>
        }
      </Container>
    </>
  )
}

export default App
