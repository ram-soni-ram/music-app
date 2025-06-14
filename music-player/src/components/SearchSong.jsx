import { Context } from "../App.jsx";
import { useContext, useEffect } from "react";
import "./SearchSong.css";

function SearchSong() {
	const {
		songDataArr,
		setSongDataArr,
		setIsSongPlay,
		songCatgory,
		setSongCatgory
	} = useContext(Context);

	function handleSearch(e) {
		if (e.key === "Enter") {
			const keyword = e.target.value.toLowerCase();
			if (keyword.trim() === "") return;
			const index = songDataArr[songCatgory].findIndex(song =>
				song.songTitle.toLowerCase().includes(keyword)
			);
			if (index !== -1) {
				const foundSong = songDataArr[songCatgory][index];
				const keys = Object.keys(songDataArr);
				const filterKeys = keys.filter(el => el !== songCatgory);
				const updateCatgoryArr = {
					[songCatgory]: [
						foundSong,
						...songDataArr[songCatgory].slice(0, index),
						...songDataArr[songCatgory].slice(index + 1)
					],
					[filterKeys[0]]: songDataArr[filterKeys[0]],
					[filterKeys[1]]: songDataArr[filterKeys[1]]
				};
				setSongDataArr(updateCatgoryArr);
				setIsSongPlay(false);
				e.target.value = "";
			}
		}
	}

	return (
		<div className="search-box">
			<input
				type="search"
				placeholder="Finde your favorate song Ram!"
				onKeyUp={handleSearch}
			/>
		</div>
	);
}

export default SearchSong;
