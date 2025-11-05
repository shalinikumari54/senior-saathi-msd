import React from 'react';

const Card = ({ title, description, icon, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {icon && (
        <div className="text-4xl text-primary mb-4">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="text-xl font-semibold text-text mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-600 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default Card;
