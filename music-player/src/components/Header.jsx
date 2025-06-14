import { FaMusic } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { Context } from "../App.jsx";
import { useContext } from "react";
import "./Header.css";

function Header() {
	const { setIsPlaylistToggle,isPlaylistToggle } = useContext(Context);

	return (
		<div className="header">
			<div>
				<FaMusic className="music-icon" />
				<h2 className="heading">Listen Song</h2>
			</div>
			<BiSolidPlaylist
				onClick={() => setIsPlaylistToggle(!isPlaylistToggle)}
				className="playlist-icon"
			/>
		</div>
	);
}

export default Header;
