import { Context } from "../App.jsx";
import { useContext, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./Playlist.css";
import SearchSong from "./SearchSong.jsx";
import Songlist from "./Songlist.jsx";

function Playlist() {
	const {
		isPlaylistToggle,
		setIsPlaylistToggle,
		songDataArr,
		songCatgory,
		setSongCatgory,
		setCurrentSongIdx,
		currentSongIdx,
		setIsSongPlay
	} = useContext(Context);

	function resetSong() {
		setCurrentSongIdx(0);
		setIsSongPlay(false);
	}

	return (
		<div
			className={`playlist-container ${
				isPlaylistToggle ? "show-playlist" : "hide-playlist"
			}`}
		>
			<div className="icon-box">
				<h4>Ram's top Playlist</h4>
				<IoMdClose
					onClick={() => setIsPlaylistToggle(!isPlaylistToggle)}
					className="close-icon"
				/>
			</div>
			<SearchSong />
			<h2 className="playlist-header">
				All ram's favorate music are here
			</h2>
			<div className="song-catgory-container">
				<div
					className={`catgory ${
						songCatgory === "hindiSong" ? "active-song-list" : null
					}`}
					onClick={() => {
						setSongCatgory("hindiSong");
						resetSong();
					}}
				>
					<img src={songDataArr.hindiSong[0].songPoster} />
					<div className="catgory-text-box">
						<p>Hindi Song</p>
					</div>
				</div>
				<div
					className={`catgory ${
						songCatgory === "bhojpuriSong"
							? "active-song-list"
							: null
					}`}
					onClick={() => {
						setSongCatgory("bhojpuriSong");
						resetSong();
					}}
				>
					<img src={songDataArr.bhojpuriSong[0].songPoster} />
					<div className="catgory-text-box">
						<p>Bhojpuri Song</p>
					</div>
				</div>
				<div
					className={`catgory ${
						songCatgory === "englishSong"
							? "active-song-list"
							: null
					}`}
					onClick={() => {
						setSongCatgory("englishSong");
						resetSong();
					}}
				>
					<img src={songDataArr.englishSong[0].songPoster} />
					<div className="catgory-text-box">
						<p>English Song</p>
					</div>
				</div>
			</div>
			<Songlist />
		</div>
	);
}

export default Playlist;
