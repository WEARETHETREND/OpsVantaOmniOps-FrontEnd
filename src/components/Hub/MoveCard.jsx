import React from 'react';
import { useMutation } from 'react-query';
import hubApi from '../api/hubApi';

const MoveCard = ({ moveTitle, expectedImpact, confidence, riskLevel, actions }) => {
    const approveMutation = useMutation(hubApi.approveInboxItem);

    const handleApprove = () => {
        approveMutation.mutate({ /* data to approve */ });
    };

    const handleReject = () => {
        // logic for rejection
    };

    const handleCustomize = () => {
        // logic for customization
    };

    return (
        <div className="move-card">
            <h3>{moveTitle}</h3>
            <div className="impact">Expected Impact: {expectedImpact}</div>
            <div className="confidence">Confidence: {confidence}</div>
            <div className="risk-level">Risk Level: <span className={`badge ${riskLevel}`}>{riskLevel}</span></div>
            <div className="actions">
                <ul>
                    {actions.map((action, index) => (
                        <li key={index}>{action}</li>
                    ))}
                </ul>
            </div>
            <div className="buttons">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleReject}>Reject</button>
                <button onClick={handleCustomize}>Customize</button>
            </div>
        </div>
    );
};

export default MoveCard;
