import React from 'react';

/*
 * A registration mark where each room begins on the ledger line:
 * a calibration notch and the room's engraved coordinate.
 */
export default function RoomMark({ index, chapter, room }) {
  return (
    <div className="room-mark" aria-hidden="true">
      <span className="notch" />
      <span className="t-engraved">
        {index} — {chapter} · {room}
      </span>
    </div>
  );
}
