import React from 'react'
import './App.css'

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Link,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes";

// CONSTANTS

type Color = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

// Timeframes
const CONVICTED_10_YEARS_AGO_SERVED_4_YEARS = 'Convicted 10 years ago; served 4 years';
const CONVICTED_20_YEARS_AGO_SERVED_15_YEARS = 'Convicted 20 years ago; served 15 years';
const CONVICTED_20_YEARS_AGO_SERVED_2_YEARS = 'Convicted 20 years ago; served 2 years';
const CONVICTED_4_YEARS_AGO = 'Convicted 4 years ago';
const CONVICTED_5_YEARS_AGO_SERVED_1_YEAR = 'Convicted 5 years ago; served 1 year';
const NO_TIME_SERVED = 'No time served';
const RELEASED_15_YEARS_AGO = 'Released fifteen years ago';
const RELEASED_2_YEARS_AGO = 'Released two years ago';

// Identities
const  DEFENDANT_IN_CIVIL_CASE = 'Defendant in civil case';
const  DEFENDANT_IN_CRIMINAL_CASE = 'Defendant in criminal case';
const  NON_DEFENDANT_WITNESS_IN_CRIMINAL_CASE = 'Non-defendant witness in criminal case';
const  PLAINTIFF_IN_CIVIL_CASE = 'Plaintiff in civil case';
const  VICTIM_IN_CRIMINAL_CASE = 'Victim in criminal case';
const  WITNESS_IN_CIVIL_CASE = 'Witness in civil case';

// Seriousness of Convictions
const  FELONY = 'Felony';
const  MISDEMEANOR = 'Misdemeanor';

// Types of Convictions
const  EMBEZZLEMENT = 'Embezzlement';
const  FRAUD = 'Fraud';
const  MURDER = 'Murder';
const  PERJURY = 'Perjury';
const  ROBBERY = 'Robbery';
const  THEFT = 'Theft';

// Pardoning
const NOT_PARDONED = 'Not pardoned';
const PARDONED_FOR_INNOCENCE = 'Pardoned for innocence';

// Juvenile Status
const JUVENILE = 'Juvenile at time of prior convicted crime';
const NOT_JUVENULE = 'Not juvenile at time of prior convicted crime';

// ARRAYS AND TYPES

const TIMEFRAMES = [
  CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
  CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
  CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
  CONVICTED_4_YEARS_AGO,
  CONVICTED_5_YEARS_AGO_SERVED_1_YEAR,
  NO_TIME_SERVED,
  RELEASED_15_YEARS_AGO,
  RELEASED_2_YEARS_AGO,
];
type Timeframe = typeof TIMEFRAMES[number];

const IDENTITIES = [
  DEFENDANT_IN_CIVIL_CASE,
  DEFENDANT_IN_CRIMINAL_CASE,
  NON_DEFENDANT_WITNESS_IN_CRIMINAL_CASE,
  PLAINTIFF_IN_CIVIL_CASE,
  VICTIM_IN_CRIMINAL_CASE,
  WITNESS_IN_CIVIL_CASE,
];
type Identity = typeof IDENTITIES[number];

const SERIOUSNESSES_OF_CONVICTIONS = [
  FELONY,
  MISDEMEANOR,
];
type Seriousness = typeof SERIOUSNESSES_OF_CONVICTIONS[number];

const TYPES_OF_CONVICTIONS = [
  EMBEZZLEMENT,
  FRAUD,
  MURDER,
  PERJURY,
  ROBBERY,
  THEFT,
];
type TypeOfConviction = typeof TYPES_OF_CONVICTIONS[number];

const PARDONING = [...Array(9).fill(NOT_PARDONED), (PARDONED_FOR_INNOCENCE)];
type Pardoning = typeof PARDONING[number];

const JUVENILE_STATUS = [...Array(9).fill(NOT_JUVENULE), (JUVENILE)];
type JuvenileStatus = typeof JUVENILE_STATUS[number];


// CHECK FUNCTIONS

const crimeIsRecent = (timeframe: Timeframe) => (
  [
    CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
    CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
    CONVICTED_4_YEARS_AGO,
    CONVICTED_5_YEARS_AGO_SERVED_1_YEAR,
    NO_TIME_SERVED,
    RELEASED_2_YEARS_AGO
  ].includes(timeframe)
);

const crimeIsDishonest = (typeOfConviction: TypeOfConviction) => (
  [
    EMBEZZLEMENT,
    FRAUD,
    PERJURY,
  ].includes(typeOfConviction)
);

const crimeIsFelony = (seriousness: Seriousness) => (
  seriousness === FELONY
)

const witnessIsCriminalDefendant = (identity: Identity) => (
  identity === DEFENDANT_IN_CRIMINAL_CASE
);

const timeframeIsFelony = (timeframe: Timeframe) => (
  [
    CONVICTED_10_YEARS_AGO_SERVED_4_YEARS,
    CONVICTED_20_YEARS_AGO_SERVED_15_YEARS,
    CONVICTED_20_YEARS_AGO_SERVED_2_YEARS,
  ].includes(timeframe)
);

const isJuvenileCrime = (juvenileStatus: JuvenileStatus) => (
  juvenileStatus === JUVENILE
);

const isPardonedForInnocence = (pardoning: Pardoning) => (
  pardoning === PARDONED_FOR_INNOCENCE
);

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
    identity: Identity,
    juvenileStatus: JuvenileStatus,
    pardoning: Pardoning,
    seriousness: Seriousness,
    timeframe: Timeframe,
    typeOfConviction: TypeOfConviction,
  }
) => {
  if (!crimeIsFelony(seriousness) && typeOfConviction === MURDER) {
    return { text: "Invalid selection. Murder cannot be misdemeanor.", color: "gray" };
  } else if (!crimeIsFelony(seriousness) && timeframeIsFelony(timeframe)) {
    return { text: "Invalid selection. Misdemeanor cannot have sentence greater than 1 year.", color: "gray" };
  } else if (isPardonedForInnocence(pardoning)) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (isJuvenileCrime(juvenileStatus)) {
    return { text: "Admit in a criminal case IF admission would be admissable against and adult AND the evidence is necessary to fairly determine the guilt or innocence", color: "orange" };
  } else if (!crimeIsRecent(timeframe)) {
    return { text: "Admit if probative value substantially outweighs prejudicial effect.", color: "orange" };
  } else if (crimeIsDishonest(typeOfConviction)) {
    return { text: "Automatically admit. No balancing test - not even Rule 403 - applies.", color: "green" }
  } else if (!crimeIsFelony(seriousness) && !timeframeIsFelony(timeframe)) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (witnessIsCriminalDefendant(identity)) {
    return { text: "Admit if probative value outweighs prejudicial effect to defendant.", color: "orange" };
  } else {
    return { text: "Admit unless Rule 403 (unfair prejudice substantially outweighs probative value) dictates exclusion", color: "yellow" };
  }
}

function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

const OptionCard = (
  {color, title, value, select, setValue, options, hideOutcome }:
  { color: Color, title: string, value: string, select: boolean, setValue: (v: string) => void, options: string[], hideOutcome: () => void }
) => (
  <Card size="2" className={`card card-${color} no-box-shadow`} >
    <Box>
      <Text as="div" size="3" align="center" weight="bold" className="exo-bold">
        {title}
      </Text>
      <Flex justify="center" >
        { select
          ? <Select.Root value={value} onValueChange={(v) => { setValue(v); hideOutcome(); }} >
            <Select.Trigger placeholder="Select..." className="select-margin exo" />
            <Select.Content color={color} >
              {options.filter(onlyUnique).sort().map(option => (
                <Select.Item value={option} className="exo"> {option} </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          : <Text as="div" size="2" m="3" align="center" className="exo"> {value} </Text>
        }
      </Flex>
    </Box>
  </Card>
)

const elementsCreateValidHistory = (
  { typeOfConviction, seriousness, timeframe }:
  { typeOfConviction: TypeOfConviction, seriousness: Seriousness, timeframe: Timeframe }
) => {
  if (seriousness === MISDEMEANOR && typeOfConviction === MURDER) {
    return false;
  } else if (seriousness === MISDEMEANOR && timeframeIsFelony(timeframe)) {
    return false;
  } else {
    return true;
  }
};


function App() {
  const [identity, setIdentity] = React.useState<Identity>("");
  const [juvenileStatus, setJuvenileStatus] = React.useState<JuvenileStatus>("");
  const [pardoning, setPardoning] = React.useState<Pardoning>("");
  const [seriousness, setSeriousness] = React.useState<Seriousness>("");
  const [timeframe, setTimeframe] = React.useState<Timeframe>("");
  const [typeOfConviction, setTypeOfConviction] = React.useState<TypeOfConviction>("");

  const [outcomeVisible, setOutcomeVisible] = React.useState<boolean>(false);
  const [enableSelects, setEnableSelects] = React.useState<boolean>(false);
  const [outcomeLock, setOutcomeLock] = React.useState<boolean>(false);

  React.useEffect(() => {
    randomize();
  }, []);

  const outcome = getOutcome({
    identity,
    juvenileStatus,
    pardoning,
    seriousness,
    timeframe,
    typeOfConviction,
  });

  const randomize = () => {
    setOutcomeVisible(false);

    let c = getRandomElement(TYPES_OF_CONVICTIONS);
    const i = getRandomElement(IDENTITIES);
    const j = getRandomElement(JUVENILE_STATUS);
    const p = getRandomElement(PARDONING);
    let s = getRandomElement(SERIOUSNESSES_OF_CONVICTIONS);
    let t = getRandomElement(TIMEFRAMES);
    let valid = elementsCreateValidHistory({
      typeOfConviction: c,
      seriousness: s,
      timeframe: t,
    });

    while (!valid) {
      c = getRandomElement(TYPES_OF_CONVICTIONS);
      s = getRandomElement(SERIOUSNESSES_OF_CONVICTIONS);
      t = getRandomElement(TIMEFRAMES);

      valid = elementsCreateValidHistory({
        typeOfConviction: c,
        seriousness: s,
        timeframe: t,
      });
    }

    setIdentity(i);
    setJuvenileStatus(j);
    setPardoning(p);
    setSeriousness(s);
    setTimeframe(t);
    setTypeOfConviction(c);
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
        <Heading size="8" weight="bold" className="exo-bold">
          Rule 609 Game
        </Heading>

        <Heading size="4" m="4" weight="regular" className="exo-bold" >
          How well do you know <Link href="https://www.law.cornell.edu/rules/fre/rule_609"> Federal Rules of Evidence Rule 609 </Link>?
        </Heading>

        <Flex justify="between" align="center" >
          <Button variant="surface" size="3" onClick={randomize} className="exo-bold">
            <Box m="6" >
              <Text size="4" weight="bold">
                Randomize Elements
              </Text>
            </Box>
          </Button>
          <div>
            <Text m="3" weight="bold" > <label htmlFor="enable-dropdowns" className="exo-bold" > Enable Dropdowns </label> </Text>
            <Switch id="enable-dropdowns" size="2" variant="classic" checked={enableSelects} onCheckedChange={(v) => setEnableSelects((v))}/>
          </div>
        </Flex>

        <OptionCard
          color="red"
          hideOutcome={() => setOutcomeVisible(false) }
          options={IDENTITIES}
          select={enableSelects}
          setValue={setIdentity}
          title="Identity of Witness"
          value={identity}
        />
        <OptionCard
          color="orange"
          hideOutcome={() => setOutcomeVisible(false) }
          options={SERIOUSNESSES_OF_CONVICTIONS}
          select={enableSelects}
          setValue={setSeriousness}
          title="Seriousness of Crime"
          value={seriousness}
        />
        <OptionCard
          color="yellow"
          hideOutcome={() => setOutcomeVisible(false) }
          options={TYPES_OF_CONVICTIONS}
          select={enableSelects}
          setValue={setTypeOfConviction}
          title="Type of Conviction"
          value={typeOfConviction}
        />
        <OptionCard
          color="green"
          hideOutcome={() => setOutcomeVisible(false) }
          options={TIMEFRAMES}
          select={enableSelects}
          setValue={setTimeframe}
          title="Time Since Conviction or Release"
          value={timeframe}
        />
        <OptionCard
          color="blue"
          hideOutcome={() => setOutcomeVisible(false) }
          options={PARDONING}
          select={enableSelects}
          setValue={setPardoning}
          title="Pardoning"
          value={pardoning}
        />
        <OptionCard
          color="purple"
          hideOutcome={() => setOutcomeVisible(false) }
          options={JUVENILE_STATUS}
          select={enableSelects}
          setValue={setJuvenileStatus}
          title="Juvenile Status"
          value={juvenileStatus}
        />

        {
          <Flex justify="between" align="center" >
            <Button variant="surface" size="3" onClick={() => setOutcomeVisible(!outcomeVisible)} disabled={outcomeLock} className="display-button exo">
              <Box m="6" >
                <Text weight="bold" className="exo-bold">
                  { outcomeVisible ? "Hide" : "Display" } Outcome
                </Text>

              </Box>
            </Button>
            <div>
              <Text m="3" weight="bold" > <label htmlFor="outcome-lock" className="exo-bold" > Keep Outcome Visible </label> </Text>
              <Switch id="outcome-lock" size="2" variant="classic" checked={outcomeLock} onCheckedChange={(v) => setOutcomeLock((v))}/>
            </div>
          </Flex>
        }

        {(outcomeVisible || outcomeLock) &&
          <Card size="4" className={`card card-${outcome.color} no-box-shadow`} >
            <Box>
              <Text align="center" className="exo"> {outcome.text} </Text>
            </Box>
          </Card>
        }
      </Container>
    </>
  )
}

export default App
