import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import './LogCard.css';

const LogCard = ({ action, timeAgo, playbookName, moneyImpact, reason, rollbackAvailable }) => {
    return (
        <div className="log-card">
            <div className="action">{action}</div>
            <div className="time-age"><Clock className="icon" /> {timeAgo}</div>
            <div className="badge">Playbook: {playbookName}</div>
            <div className="money-impact"><DollarSign className="icon" /> ${moneyImpact}</div>
            <div className="reason">{reason}</div>
            {rollbackAvailable && <button className="rollback-button">Rollback</button>}
        </div>
    );
};

export default LogCard;