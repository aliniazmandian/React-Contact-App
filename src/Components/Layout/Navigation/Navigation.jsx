import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const Navigation = () => {
	const items = [
		{ to: "/contacts", name: "Contacts", icon:<i class="fa-solid fa-user"></i> },
		{ to: "/notes", name: "Notes", icon:<i class="fa-solid fa-bookmark"></i> },
		{ to: "/", name: "Home", icon: <i class="fa-solid fa-house"></i>,exact:true },
		{ to: "/todos", name: "Todos", icon: <i class="fa-solid fa-clipboard"></i> },
		{ to: "/clock", name: "Clock", icon: <i class="fa-solid fa-clock"></i> },
	];

	return (
		<footer className={style.footer}>
			<nav className={style.nav}>
				<div className={style.navigation}>
					<ul>
						{items.map((item) => {
						return	<li key={item.to} className={style.list}>
							<NavLink  exact={item.exact || false} activeClassName={style.active} to={item.to}>
							
								<span className={style.icon}>
									{item.icon}
								</span>
								<span className={style.text}>{item.name}</span>
							</NavLink>
						</li>
						})}
						
						
					</ul>
					<div className={style.indicator}></div>
				</div>
			</nav>
			
		</footer>
		
	);
};

export default Navigation;
