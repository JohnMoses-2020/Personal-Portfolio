import React, { useState } from 'react';
import { DEPTH_LEVELS } from '../../content/evidence.js';
import Checksum from '../common/Checksum.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import ProvisionalStamp from '../common/ProvisionalStamp.jsx';
import SystemSketch from './SystemSketch.jsx';

function ReservedArtifact({ awaiting, shape = 'document' }) {
  return (
    <div className={`reserved-artifact reserved-artifact--${shape}`}>
      <span className="reserved-artifact__corner" aria-hidden="true" />
      <span className="reserved-artifact__corner" aria-hidden="true" />
      <span className="reserved-artifact__corner" aria-hidden="true" />
      <span className="reserved-artifact__corner" aria-hidden="true" />
      <EngravedLabel>Reserved bench position</EngravedLabel>
      <p className="reserved-artifact__awaiting">{awaiting}</p>
      <ProvisionalStamp title="This position holds space for a real artifact">Awaiting artifact</ProvisionalStamp>
    </div>
  );
}

export default function EvidenceAssembly({ assembly, flip }) {
  const [depth, setDepth] = useState('experience');

  return (
    <article className={`assembly ${flip ? 'assembly--flip' : ''}`} aria-labelledby={`${assembly.id}-title`}>
      <div className="workplate assembly__artifact">
        <div className="assembly__artifact-head">
          <EngravedLabel className="assembly__kind">{assembly.kind}</EngravedLabel>
          <h3 id={`${assembly.id}-title`} className="assembly__title">
            {assembly.title}
          </h3>
        </div>
        <div className="assembly__media">
          {assembly.artifact.type === 'system-sketch' ? (
            <SystemSketch />
          ) : (
            <ReservedArtifact awaiting={assembly.artifact.awaiting} shape={assembly.artifact.shape} />
          )}
        </div>
      </div>

      <div className="assembly__notes">
        <div className="assembly__note-block">
          <EngravedLabel notch notchColor="notch--cobalt">
            The decision that shaped it
          </EngravedLabel>
          <p className="assembly__decision">{assembly.decisionNote}</p>
        </div>

        <div className="provenance">
          <Checksum seed={assembly.checksumSeed} size={16} label={`${assembly.system} checksum`} />
          <span className="provenance__text">
            {assembly.system} · {assembly.state} · {assembly.date} · {assembly.revision}
          </span>
          {assembly.provisionalState && <ProvisionalStamp title="State awaiting John’s confirmation">Verify</ProvisionalStamp>}
        </div>

        <div className="assembly__note-block">
          <EngravedLabel>{assembly.supporting.label}</EngravedLabel>
          <p className="assembly__supporting">{assembly.supporting.body}</p>
          {assembly.supporting.provisional && <ProvisionalStamp>Awaiting trace</ProvisionalStamp>}
        </div>

        <div className="assembly__note-block">
          <EngravedLabel>Reading depth</EngravedLabel>
          <div className="depth-lens">
            <div className="depth-lens__control" role="group" aria-label="Reading depth">
              {DEPTH_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  aria-pressed={depth === level.id}
                  onClick={() => setDepth(level.id)}
                >
                  {level.label}
                </button>
              ))}
            </div>
            <p key={depth} className="depth-lens__text">
              {assembly.depths[depth]}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
