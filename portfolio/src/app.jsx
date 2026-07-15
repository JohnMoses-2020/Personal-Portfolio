import React, { useState } from 'react';

import DatumRail from './components/datum/DatumRail.jsx';
import LedgerLine from './components/datum/LedgerLine.jsx';
import Arrival from './components/chapters/Arrival.jsx';
import InstrumentBay from './components/instrument/InstrumentBay.jsx';
import OneDay from './components/scenario/OneDay.jsx';
import SilenceBreak from './components/chapters/SilenceBreak.jsx';
import EvidenceBench from './components/evidence/EvidenceBench.jsx';
import DecisionLedger from './components/chapters/DecisionLedger.jsx';
import MakersEdge from './components/chapters/MakersEdge.jsx';
import FarEnd from './components/chapters/FarEnd.jsx';

import './components/common/common.css';
import './components/datum/datum.css';
import './app.css';

/*
 * The Long Table, translated: one warm page walked from the near edge to the
 * far end. Arrival → Discovery → Understanding → Evidence → Judgment →
 * Person → Invitation. The chosen intention persists across rooms.
 */
export default function App() {
  const [intentionId, setIntentionId] = useState(null);

  return (
    <div id="top">
      <a className="skip-link" href="#system">
        Skip to the system
      </a>
      <DatumRail />
      <div className="page-frame">
        <LedgerLine />
        <main id="main">
          <Arrival />
          <InstrumentBay intentionId={intentionId} onSelectIntention={setIntentionId} />
          <OneDay intentionId={intentionId} onSelectIntention={setIntentionId} />
          <SilenceBreak />
          <EvidenceBench />
          <DecisionLedger />
          <MakersEdge />
          <FarEnd />
        </main>
      </div>
    </div>
  );
}
