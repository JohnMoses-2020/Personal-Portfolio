import React, { useState } from 'react';
import { SCENARIOS } from '../../content/scenarios.js';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import ProvisionalStamp from '../common/ProvisionalStamp.jsx';
import ScenarioPlayer from './ScenarioPlayer.jsx';
import './scenario.css';

/*
 * 03 Understanding — the moment of wonder: several quiet systems cooperating
 * around one life. Four moments of one day; the value lives between agents.
 */
export default function OneDay({ intentionId, onSelectIntention }) {
  const activeId = intentionId || 'plan-travel';
  const scenario = SCENARIOS.find((s) => s.id === activeId);

  /* Progress is kept per scenario, so switching stories never resets your place. */
  const [progress, setProgress] = useState({});
  const stepsDone = progress[activeId] || 0;
  const setStepsDone = (value) => setProgress((current) => ({ ...current, [activeId]: value }));

  return (
    <section id="understanding" className="room" aria-labelledby="understanding-heading">
      <RoomMark index="03" chapter="Understanding" room="One Day, Many Systems" />

      <header className="room-head">
        <EngravedLabel className="room-kicker">One day, four moments</EngravedLabel>
        <h2 id="understanding-heading" className="t-claim">
          The value lives between the agents.
        </h2>
        <p className="t-lede room-lede">
          Follow one ordinary day, one responsibility at a time. Jarvis coordinates; specialists contribute; a person
          stays in charge of what matters.
        </p>
      </header>

      <div className="day-strip" role="group" aria-label="Moments of the day">
        {SCENARIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="day-strip__moment"
            aria-pressed={activeId === item.id}
            onClick={() => onSelectIntention(item.id)}
          >
            <span className="day-strip__time">
              <span className="notch" aria-hidden="true" />
              {item.time}
            </span>
            <span className="day-strip__label">{item.label}</span>
          </button>
        ))}
      </div>

      <ScenarioPlayer scenario={scenario} stepsDone={stepsDone} onStepsDone={setStepsDone} />

      <p className="scenario-honesty">
        <span className="t-caption">
          An authored demonstration of how these systems behave — not a live run, and it does not pretend to be.
        </span>
        {scenario.provisional && <ProvisionalStamp title="Sequence drafted; awaiting John’s verification">Awaiting verification</ProvisionalStamp>}
      </p>
    </section>
  );
}
