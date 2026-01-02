const InterestTile = ({ icon, title, description, className = '' }) => {
  return (
    <div
      className={`
        glass rounded-xl p-6
        transform transition-all duration-300
        hover:scale-[1.02] hover:-translate-y-1
        hover:shadow-lg hover:shadow-primary-blue/10
        group
        ${className}
      `}
    >
      {/* Icon */}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default InterestTile
