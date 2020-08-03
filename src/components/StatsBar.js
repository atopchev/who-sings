import React from 'react';
import { Link } from 'react-router-dom';

const StatsBar = ({ score, n, idx, player, gameOver = false }) => {

	const scoreLinks = (gameOver) 
		? <>
			<span>
				<Link to="/global-rankings">
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-trophy"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z" />
						<path
						fillRule="evenodd"
						d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
						/>
						<path d="M7 10h2v4H7v-4z" />
						<path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z" />
					</svg>
				</Link>
			</span>
			<span>
				<Link to={`/my-scores/${player}`}><i className="glyphicon glyphicon-user"></i></Link>
			</span>
		</>
		: '';
	return (
		<>
			<p>
				Score: {score} / {n * 100}{" "}
			</p>
			<p>
				Question {idx} of {n}
			</p>
			{ scoreLinks }
		</>
	);
};

export default StatsBar;
