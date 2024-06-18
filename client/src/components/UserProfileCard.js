import React from 'react';
import PropTypes from 'prop-types';

const UserProfileCard = ({ user,col }) => {
  const cardClasses = `shadow-sm p-3 mb-5 bg-white rounded border-0 card m-3 p-3 ${col ? `col-${col}` : ''}`;

  return (
    <div className={cardClasses}>
        <div class="row">
 
      <div class="col-md-2">
      <img size="32" height="32" width="32" src={user.image} className="rounded-circle user-avatar" alt="User Avatar" />
      </div>
 
      <div class="col-md-9">
        <span>{user.github_id}</span>
      </div>
      </div>
      <div className="card-body p-1">
        <small className="card-text">
        {user.blog_url && (
            <a href={user.blog_url}>
            {user.blog_url}
            </a>
        )}
        </small>
        <p className="card-text">
          <small className="text-muted">{user.joinedDate}</small>
        </p>
      </div>
    </div>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    joinedDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileCard;