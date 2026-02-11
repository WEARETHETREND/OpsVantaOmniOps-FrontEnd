import React from 'react';

const AlertCard = ({ title, severity, moneyImpact, confidence, deadline, reason, details }) => {
    let severityColor;

    switch (severity) {
        case 'high':
            severityColor = 'bg-red-500';
            break;
        case 'medium':
            severityColor = 'bg-orange-500';
            break;
        case 'low':
            severityColor = 'bg-yellow-500';
            break;
        case 'info':
            severityColor = 'bg-blue-500';
            break;
        default:
            severityColor = 'bg-gray-500';
    }

    return (
        <div className={`border rounded-lg p-4 ${severityColor} text-white mb-4`}>
            <h2 className="font-bold text-lg">{title}</h2>
            <div className="flex items-center justify-between">
                <span className="text-sm">{moneyImpact}</span>
                <span className="text-sm">Confidence: {confidence}</span>
                <span className="text-sm">Deadline: {deadline}</span>
            </div>
            <p className="mt-2">{reason}</p>
            <button className="mt-4 text-sm text-gray-300 hover:underline" onClick={() => alert(details)}>View Details</button>
        </div>
    );
};

export default AlertCard;