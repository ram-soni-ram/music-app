import { useState, useRef, useEffect, createContext } from "react";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import {
	MdOutlineReplay10,
	MdForward10,
	MdRepeat,
	MdRepeatOne
} from "react-icons/md";
import { FaPlay, FaPause, FaVolumeOff, FaVolumeUp } from "react-icons/fa";
import songData from "./songData.js";
import Header from "./components/Header.jsx";
import Playlist from "./components/Playlist.jsx";
import playingGif from "./assets/playing.gif";
import "./App.css";

export const Context = createContext();

function App() {
	const [isPlaylistToggle, setIsPlaylistToggle] = useState(false);
	const [isSongPlay, setIsSongPlay] = useState(false);
	const [currentSongIdx, setCurrentSongIdx] = useState(0);
	const [volume, setVolume] = useState(1);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isSongRepeat, setIsSongRepeat] = useState(false);
	const [songDataArr, setSongDataArr] = useState(songData);
	const [songCatgory, setSongCatgory] = useState("hindiSong");
	const audioRef = useRef(null);
	const rangeRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (audioRef.current) {
			if (isSongPlay) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}, [isSongPlay, currentSongIdx]);

	useEffect(() => {
		if (!rangeRef.current) return;
		const min = 0;
		const max = duration || 1;
		const value = currentTime;
		const percentage = ((value - min) / (max - min)) * 100;
		rangeRef.current.style.backgroundImage = `linear-gradient(to right, #11ff7d ${percentage}%, #ddd ${percentage}%)`;
	}, [currentTime, duration]);

	const handlePlayPause = () => setIsSongPlay(prev => !prev);

	const handlePrev = () => {
		setCurrentSongIdx(prev =>
			prev === 0 ? songDataArr[songCatgory].length - 1 : prev - 1
		);
		setIsSongPlay(true);
	};

	const handleNext = () => {
		setCurrentSongIdx(prev => (prev + 1) % songDataArr[songCatgory].length);
		setIsSongPlay(true);
	};

	const handleEnded = () => {
		if (isSongRepeat) {
			audioRef.current.play();
			audioRef.current.currentTime = 0;
		} else {
			handleNext();
		}
	};

	const handleReplay10 = () => {
		audioRef.current.currentTime -= 10;
	};

	const handleForward10 = () => {
		audioRef.current.currentTime += 10;
	};

	const handleTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime);
		setDuration(audioRef.current.duration);
	};

	const handleSeek = e => {
		audioRef.current.currentTime = e.target.value;
	};

	const formatTime = time => {
		if (isNaN(time)) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<Context.Provider
			value={{
				isPlaylistToggle,
				setIsPlaylistToggle,
				songDataArr,
				setSongDataArr,
				isSongPlay,
				setIsSongPlay,
				currentSongIdx,
				setCurrentSongIdx,
				handlePlayPause,
				songCatgory,
				setSongCatgory
			}}
		>
			<div className="music-container">
				<Header />
				<Playlist />

				<img
					className="img"
					src={songDataArr[songCatgory][currentSongIdx].songPoster}
					alt="current-song Poster"
				/>
				<p className="current-song-title">
					{songDataArr[songCatgory][currentSongIdx].songTitle}
				</p>

				<audio
					ref={audioRef}
					src={songDataArr[songCatgory][currentSongIdx].songUrl}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleTimeUpdate}
					onEnded={handleEnded}
				/>

				<div className="song-controle-box">
					<div className="song-timing-box">
						<img
							src={playingGif}
							alt="gif"
							className={`gif ${
								isSongPlay ? "show-gif" : "hide-gif"
							}`}
						/>
						<p className="time">
							{formatTime(currentTime)} / {formatTime(duration)}
						</p>
					</div>

					<div className="range-slider">
						<input
							type="range"
							min="0"
							max={duration || 0}
							value={currentTime}
							onChange={handleSeek}
							ref={rangeRef}
						/>
					</div>

					<div className="song-oprater-box">
						<MdOutlineReplay10 onClick={handleReplay10} />
						<IoCaretBackSharp onClick={handlePrev} />
						{isSongPlay ? (
							<FaPause
								onClick={handlePlayPause}
								className="pause-icon"
							/>
						) : (
							<FaPlay
								onClick={handlePlayPause}
								className="play-icon"
							/>
						)}
						<IoCaretForwardSharp onClick={handleNext} />
						<MdForward10 onClick={handleForward10} />
					</div>

					<div className="volume-container">
						<button
							className="volume-icon"
							onClick={() => setVolume(volume === 0 ? 1 : 0)}
						>
							{volume > 0.1 ? <FaVolumeUp /> : <FaVolumeOff />}
						</button>

						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							onChange={e =>
								setVolume(parseFloat(e.target.value))
							}
						/>
					</div>
					<button
						className="repeat-btn"
						onClick={() => setIsSongRepeat(!isSongRepeat)}
					>
						{isSongRepeat ? (
							<MdRepeat className="repeat-icon" />
						) : (
							<MdRepeatOne className="repeat-icon" />
						)}
					</button>
				</div>
			</div>
		</Context.Provider>
	);
}

export default App;
