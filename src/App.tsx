import React from 'react'
import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Strong,
  Text,
} from "@radix-ui/themes";
import './App.css'

const NBSP = '\u00A0';

// Timeframes
const  RELEASED_2_YEARS_AGO = 'Released two years ago';
const  RELEASED_15_YEARS_AGO = 'Released fifteen years ago';
const  CONVICTED_20_YEARS_AGO_SERVED_15_YEARS = 'Convicted 20 years ago; served 15 years';
const  CONVICTED_5_YEARS_AGO_SERVED_1_YEAR = 'Convicted 5 years ago; servied 1 year';
const  CONVICTED_4_YEARS_AGO = 'Convicted 4 years ago';
const  CONVICTED_10_YEARS_AGO_SERVED_4_YEARS = 'Convicted 10 years ago; served 4 years';

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
const  CARRIES_SENTENCE_OF_UP_TO_2_YEARS_GOT_PROBATION = 'Carries sentence of up to two years; got probation';
const  SERVED_ONE_YEAR = 'Served one year';
const  CARRIES_SENTENCE_OF_UP_TO_6_MONTHS_SERVED_TWO_MONTHS = 'Carries sentence of up to six months; served two months';

// Types of Convictions
const  ROBBERY = 'Robbery';
const  EMBEZZLEMENT = 'Embezzlement';
const  THEFT = 'Theft';
const  MURDER = 'Murder';
const  PERJURY = 'Perjury';
const  FRAUD = 'Fraud';

const TIMEFRAMES = [
  RELEASED_2_YEARS_AGO,
  RELEASED_15_YEARS_AGO,
  CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
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
  CARRIES_SENTENCE_OF_UP_TO_2_YEARS_GOT_PROBATION,
  SERVED_ONE_YEAR,
  CARRIES_SENTENCE_OF_UP_TO_6_MONTHS_SERVED_TWO_MONTHS,
]
const TYPES_OF_CONVICTIONS = [
  ROBBERY,
  EMBEZZLEMENT,
  THEFT,
  MURDER,
  PERJURY,
  FRAUD,
];

const getRandomElement = (arr: string[]) => (
  arr[Math.floor(Math.random()*arr.length)]
)

const getOutcome = (
  { identity, seriousness, typeOfConviction, timeframe }
  : {identity: string, seriousness: string, typeOfConviction: string, timeframe: string }
) => {
  if (
    [
      MISDEMEANOR,
      SERVED_ONE_YEAR,
      CARRIES_SENTENCE_OF_UP_TO_6_MONTHS_SERVED_TWO_MONTHS
    ].includes(seriousness)
  ) {
    return "Automatically exclude. No balancing test applies.";
  } else if (
    [
      RELEASED_2_YEARS_AGO,
      CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
      CONVICTED_5_YEARS_AGO_SERVED_1_YEAR,
      CONVICTED_4_YEARS_AGO,
      CONVICTED_10_YEARS_AGO_SERVED_4_YEARS
    ].includes(timeframe)) {
    return "Exclude unless probative value substantially outweighs prejudicial effect.";
  } else if (
    [
      EMBEZZLEMENT,
      PERJURY,
      FRAUD,
    ].includes(typeOfConviction)
    && identity === DEFENDANT_IN_CRIMINAL_CASE
  ) {
    return "Admit if probative value substantially outweighs prejudicial effect.";
  } else if (
    [
      EMBEZZLEMENT,
      PERJURY,
      FRAUD,
    ].includes(typeOfConviction)
    && identity !== DEFENDANT_IN_CRIMINAL_CASE
  ) {
    return "Admit unless Rule 403 (unfair prejudice substantially outweighs probative value) dictates exclusion";
  } else if (
    [
      EMBEZZLEMENT,
      PERJURY,
      FRAUD,
    ].includes(typeOfConviction)
  ) {
    return "Automatically admit. No balancing test - not even Rule 403 - applies."
  } else {
    return "Missing outcome..."
  }
}

const OptionCard = ({color, title, value}: { color: string, title: string, value: string }) => (
  <Card size="2" className={`card card-${color}`} >
    <Box>
      <Text as="div" size="3" align="center" weight="bold">
        {title}
      </Text>
      <Text as="div" size="2" align="center">
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
  const [outcomeVisible, setOutcomeVisible] = React.useState(false);
  const [outcomeButtonVisible, setOutcomeButtonVisible ] = React.useState(false);

  const randomize = () => {
    setTimeframe(getRandomElement(TIMEFRAMES));
    setIdentity(getRandomElement(IDENTITIES));
    setSeriousness(getRandomElement(SERIOUSNESSES_OF_CONVICTIONS));
    setTypeOfConviction(getRandomElement(TYPES_OF_CONVICTIONS));
    setOutcomeVisible(false);
    setOutcomeButtonVisible(true);
  };

  return (
    <Container size="2">
      <h1> Rule 609 Game </h1>

      <Button onClick={randomize}> Randomize </Button>

      <OptionCard color="red" title="Identity of Witness" value={identity}/>
      <OptionCard color="green" title="Seriousness of Crime" value={seriousness}/>
      <OptionCard color="orange" title="Type of Conviction" value={typeOfConviction}/>
      <OptionCard color="blue" title="Time Since Conviction or Release" value={timeframe}/>

      { outcomeButtonVisible && <Button onClick={() => setOutcomeVisible(true)}> Click to reveal outcome </Button> }

      {outcomeVisible &&
      <Callout.Root highContrast className="card" color="blue" variant="surface">
        <Callout.Text m="3" >
          <Strong> {getOutcome({ timeframe, identity, seriousness, typeOfConviction })} </Strong>
        </Callout.Text>
      </Callout.Root>
      }
    </Container>
  )
}

export default App
