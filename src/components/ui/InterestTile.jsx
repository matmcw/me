const InterestTile = ({ icon, title, description, className = '' }) => {
	return (
		<div className={`interest-tile ${className}`}>
			<div className="interest-tile-icon">{icon}</div>
			<h3 className="interest-tile-title">{title}</h3>
			<p className="interest-tile-description">{description}</p>
		</div>
	)
}

export default InterestTile
