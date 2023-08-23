import React from 'react';

interface ActivityMenuProps {
  activities: any[]; // Replace with your type for activities
  onSelectActivity: (index: number) => void;
}

const ActivityMenu: React.FC<ActivityMenuProps> = ({ activities, onSelectActivity }) => {
  return (
    <div className="activity-menu">
      <h2>Error Find</h2>
      <div>
        {activities.map((activity, index) => (
          <div key={index}>
            <button onClick={() => onSelectActivity(index)}>{activity.activity_name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityMenu;
