import React from 'react'
import './App.css'
import { TextEffectTwo } from 'react-text-animate'

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
  } else if (isJuvenileCrime(juvenileStatus) && witnessIsCriminalDefendant(identity)) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (isJuvenileCrime(juvenileStatus)) {
    return { text: "Admit in a criminal case IF admission would be admissable against an adult AND the evidence is necessary to fairly determine the guilt or innocence", color: "orange" };
  } else if (!crimeIsRecent(timeframe)) {
    return { text: "Admit if probative value substantially outweighs prejudicial effect and proponent gives adverse party reasonable written notice.", color: "orange" };
  } else if (crimeIsDishonest(typeOfConviction)) {
    return { text: "Automatically admit. No balancing test - not even Rule 403 - applies.", color: "green" }
  } else if (!crimeIsFelony(seriousness) && !timeframeIsFelony(timeframe)) {
    return { text: "Automatically exclude. No balancing test applies.", color: "red" };
  } else if (witnessIsCriminalDefendant(identity)) {
    return { text: "Admit if probative value outweighs prejudicial effect to defendant.", color: "orange" };
  } else {
    return { text: "Admit subject to rule 403.", color: "yellow" };
  }
}

function onlyUnique(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

const OptionCard = (
  { animationKey, color, title, value, select, setValue, options, hideOutcome, playAnimation }:
  { animationKey: number, color: Color, title: string, value: string, select: boolean, setValue: (v: string) => void, options: string[], hideOutcome: () => void, playAnimation: () => void }
) => (
  <Card size="2" className={`card card-${color} no-box-shadow`} >
    <Box>
      <Text as="div" size="3" align="center" weight="bold" className="exo-bold">
        {title}
      </Text>
      <Flex justify="center" >
        { select
          ?
            <Select.Root value={value} onValueChange={(v) => { setValue(v); hideOutcome(); playAnimation(); }} >
              <Select.Trigger placeholder="Select..." className="select-margin exo" />
              <Select.Content color={color} >
                {options.filter(onlyUnique).sort().map(option => (
                  <Select.Item value={option} className="exo" key={option} > {option} </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            : (<>
                <div className="motion-on">
                  <Text as="div" size="2" align="center" className="exo">
                    <TextEffectTwo staggerDuration={0.05} text={value} key={animationKey} />
                  </Text>
                </div>

                <div className="motion-off">
                  <Text as="div" size="2" align="center" className="exo no-motion-value">
                    {value}
                  </Text>
                </div>
              </>)
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

  const [animationKey, setAnimationKey] = React.useState<number>(0);

  const playAnimation = () => {
    setAnimationKey(animationKey + 1);
  }

  React.useEffect(() => {
    randomize();
  }, []); // eslint-disable-line

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

    playAnimation();
  };

  const outcomeColor = outcomeVisible || outcomeLock ? outcome.color : "white";

  return (
    <>
      <Container size="2">
        <Heading size="8" weight="bold" className="exo-bold">
          Fed.R.Evid. § 609 Game
        </Heading>

        <Heading size="4" m="4" weight="regular" className="exo-bold" >
          How well do you know <Link href="https://www.law.cornell.edu/rules/fre/rule_609"> Federal Rules of Evidence § 609 </Link>?
        </Heading>

        <Flex justify="between" align="center" >
          <Button variant="surface" size="3" onClick={randomize} className="exo-bold hover-effect">
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
          animationKey={animationKey}
          color="red"
          hideOutcome={() => setOutcomeVisible(false) }
          options={IDENTITIES}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setIdentity}
          title="Identity of Witness"
          value={identity}
        />
        <OptionCard
          animationKey={animationKey}
          color="orange"
          hideOutcome={() => setOutcomeVisible(false) }
          options={SERIOUSNESSES_OF_CONVICTIONS}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setSeriousness}
          title="Seriousness of Crime"
          value={seriousness}
        />
        <OptionCard
          animationKey={animationKey}
          color="yellow"
          hideOutcome={() => setOutcomeVisible(false) }
          options={TYPES_OF_CONVICTIONS}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setTypeOfConviction}
          title="Type of Conviction"
          value={typeOfConviction}
        />
        <OptionCard
          animationKey={animationKey}
          color="green"
          hideOutcome={() => setOutcomeVisible(false) }
          options={TIMEFRAMES}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setTimeframe}
          title="Time Since Conviction or Release"
          value={timeframe}
        />
        <OptionCard
          animationKey={animationKey}
          color="blue"
          hideOutcome={() => setOutcomeVisible(false) }
          options={PARDONING}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setPardoning}
          title="Pardoning"
          value={pardoning}
        />
        <OptionCard
          animationKey={animationKey}
          color="purple"
          hideOutcome={() => setOutcomeVisible(false) }
          options={JUVENILE_STATUS}
          playAnimation={playAnimation}
          select={enableSelects}
          setValue={setJuvenileStatus}
          title="Juvenile Status"
          value={juvenileStatus}
        />

        {
          <Flex justify="between" align="center" >
            <Button variant="surface" size="3" onClick={() => setOutcomeVisible(!outcomeVisible)} disabled={outcomeLock} className={`display-button exo ${!outcomeLock && "hover-effect"}`}>
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

        <Card size="4" className={`card card-answer card-${outcomeColor} no-box-shadow`} >
          <Flex direction="column" justify="center" style={{ height: "100%" }} >
            <Box>
              <Text align="center" className={`exo ${!outcomeVisible && !outcomeLock && "hide"}`}>
                <div className="motion-on">
                  <TextEffectTwo staggerDuration={0.05} text={outcome.text} key={animationKey} />
                </div>

                <div className="motion-off">
                  {outcome.text}
                </div>
              </Text>
            </Box>
          </Flex>
        </Card>

        <div>
          © {(new Date).getFullYear()} by <a href="https://youngren.io/"> Zack Youngren</a>
          {" "}
          licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> CC BY-NC-SA 4.0</a>
          {" "}
          <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }} />
          <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }} />
          <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }} />
          <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style={{ maxWidth: "1em", maxHeight: "1em", marginLeft: ".2em" }} />
        </div>

        <div>
          Code on {" "} <a href="https://www.github.com/zack/rule609">GitHub</a>
        </div>
      </Container>
    </>
  )
}

export default App
