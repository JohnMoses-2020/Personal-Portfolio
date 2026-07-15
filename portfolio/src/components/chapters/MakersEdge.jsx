import React, { useState } from 'react';
import { ARTIFACTS, NOTEBOOK, MAKER } from '../../content/person.js';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import ProvisionalStamp from '../common/ProvisionalStamp.jsx';
import './makers.css';

function MakerArtifact({ artifact, open, onToggle }) {
  return (
    <div>
      <button
        type="button"
        className="workplate maker-artifact"
        aria-expanded={open}
        onClick={() => onToggle(artifact.id)}
      >
        <span className="maker-artifact__media">
          <EngravedLabel>Reserved</EngravedLabel>
          <span className="maker-artifact__awaiting">{artifact.media.awaiting}</span>
        </span>
        <span className="maker-artifact__base">
          <EngravedLabel className="maker-artifact__kind">{artifact.kind}</EngravedLabel>
          <span className="maker-artifact__title">{artifact.title}</span>
          <span className="maker-artifact__provenance">{artifact.provenance}</span>
          <span className="maker-artifact__hint">{open ? '– Close the note' : '+ Read the field note'}</span>
        </span>
      </button>
      {open && (
        <div className="maker-artifact__note">
          {artifact.note}
          {artifact.noteProvisional && (
            <div>
              <ProvisionalStamp title="Note drafted; awaiting John’s own words">Awaiting John’s words</ProvisionalStamp>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/*
 * 06 Person — the maker, discovered at the edges of the work.
 * Three artifacts at once. One sentence each. Only the selected artifact
 * reveals its note; nothing rotates, nothing counts followers.
 */
export default function MakersEdge() {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section id="person" className="room" aria-labelledby="person-heading">
      <RoomMark index="06" chapter="Person" room="The Maker’s Edge" />

      <header className="room-head">
        <EngravedLabel className="room-kicker">The maker’s edge</EngravedLabel>
        <h2 id="person-heading" className="t-claim">
          The life that teaches the noticing.
        </h2>
        <p className="t-lede room-lede">
          Travel and California shape how time and movement read. Listening sharpens the sense for silence and signal.
          Making pasta on Sundays is iteration by other means.
        </p>
      </header>

      <div className="makers__layout">
        <div className="makers__artifacts">
          {ARTIFACTS.map((artifact) => (
            <MakerArtifact key={artifact.id} artifact={artifact} open={openId === artifact.id} onToggle={toggle} />
          ))}
        </div>

        <aside className="makers__aside">
          <div className="workplate makers__photo">
            <div className="makers__photo-media">
              <p>{MAKER.photo.awaiting}</p>
            </div>
            <div className="makers__photo-base">
              <EngravedLabel>At work</EngravedLabel>
              <span className="makers__microsoft">{MAKER.microsoftLine}</span>
            </div>
          </div>

          <div className="workplate notebook">
            <div className="notebook__head">
              <EngravedLabel notch>{NOTEBOOK.title}</EngravedLabel>
              <span className="notebook__date">{NOTEBOOK.date}</span>
            </div>
            <p className="notebook__body">{NOTEBOOK.body}</p>
            <a className="notebook__link" href={`#decision-${NOTEBOOK.linksTo.decisionId}`}>
              {NOTEBOOK.linksTo.label} ↑
            </a>
            {NOTEBOOK.provisional && (
              <div>
                <ProvisionalStamp title="Awaiting a page from the real notebook">Awaiting the notebook</ProvisionalStamp>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
