import { Context } from "../App.jsx";
import { useContext, useEffect } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Songlist.css";

function Songlist() {
	const {
		isPlaylistToggle,
		setIsPlaylistToggle,
		songDataArr,
		setSongDataArr,
		isSongPlay,
		currentSongIdx,
		setCurrentSongIdx,
		handlePlayPause,
		setIsSongPlay,
		songCatgory,
		setSongCatgory
	} = useContext(Context);

	function downloadSong(index) {
		const a = document.createElement("a");
		a.href = songDataArr[songCatgory][index].songUrl;
		a.download = songDataArr[songCatgory][index].songTitle || "";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	return (
		<div className="song-list-container">
			{songDataArr[songCatgory].map((data, index) => (
				<div
					className={`song ${
						data.id === songDataArr[songCatgory][currentSongIdx].id
							? "active"
							: null
					}`}
					key={index}
				>
					<img src={data.songPoster} alt="poster of title song!" />

					<p className="title">{data.songTitle}</p>

					<div className="opraters">
						<button
							onClick={() => {
								if (index === currentSongIdx) {
									setIsSongPlay(!isSongPlay);
								} else {
									setCurrentSongIdx(index);
									setIsSongPlay(true);
								}
							}}
						>
							{isSongPlay &&
							data.id ===
								songDataArr[songCatgory][currentSongIdx].id ? (
								<FaPause className="pause-icon" />
							) : (
								<FaPlay className="play-icon" />
							)}
						</button>
						<button onClick={() => downloadSong(index)}>
							<IoMdDownload className="download-icon" />
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default Songlist;
