import Header from "./Header/Header";
import style from "./Layout.module.css";
import Navigation from "./Navigation/Navigation";
import SideBar from "./SideBar/SideBar";

const Layout = ({ children }) => {
	return (
		<div className={style.layoutBackGround}>
			<div className={`${style.light} ${style.x1}`}></div>
			<div className={`${style.light} ${style.x2}`}></div>
			<div className={`${style.light} ${style.x3}`}></div>
			<div className={`${style.light} ${style.x4}`}></div>
			<div className={`${style.light} ${style.x5}`}></div>
			<div className={`${style.light} ${style.x6}`}></div>
			<div className={`${style.light} ${style.x7}`}></div>
			<div className={`${style.light} ${style.x8}`}></div>
			<div className={`${style.light} ${style.x9}`}></div>

			<div className={style.layoutContainer}>
				<Header />
				<SideBar />
				<main className={style.main}>
					<section className={style.mainContainer}>{children}</section>
				</main>

				<Navigation />
			</div>
		</div>
	);
};

export default Layout;
