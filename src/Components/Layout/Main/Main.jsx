
import style from "./Main.module.css";

const Main = ({ children }) => {
	return (
		
			<main className={style.main}>
				<section className={style.mainContainer}>{children}</section>
			</main>
		
	);
};

export default Main;
