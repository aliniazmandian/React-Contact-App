import { useEffect, useState } from "react";
import style from "./Header.module.css";

const Header = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [sideBarCss, setSideBarCss] = useState({
		width: "0px",
		border: "0px",
		boxShadow: "0px",
	});

	const openHandler = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			setSideBarCss(
				"-64px"
			);
		} else {
			setSideBarCss(
				 "14px"
			
			);
		}
	}, [isOpen]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--side-left",
			sideBarCss
		);
		
	}, [sideBarCss]);

	return (
		<header className={style.header}>
			<div className={style.container}>
				<span className={style.icon}>
					<span className={style.iconContainer} onClick={openHandler}>
						{isOpen ? (
							<i class="fa-solid fa-bars"></i>
						) : (
							<i class="fa-solid fa-xmark"></i>
						)}
					</span>
				</span>

				<span className={style.title}>Contact App</span>
			</div>
		</header>
	);
};

export default Header;
