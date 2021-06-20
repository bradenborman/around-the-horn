import React from "react";

export interface IScoreControlsProps {}

export const ScoreControls: React.FC<IScoreControlsProps> = (
  props: IScoreControlsProps
) => {
  return (
    <div id="score-controls">
      <h2>Score Controls</h2>
      <div id="button-wrapper">
        <div className="player-btn-group">
          <div className="name">Test Player</div>
          <div className="score-adjust-btn-wrapper">
            <button className="control">Up</button>
            <button className="control">Down</button>
          </div>
        </div>
      </div>
    </div>
  );
};
