import { AnimatePresence } from "framer-motion";
import { Route } from "react-router-dom";
import { Switch, useLocation } from "react-router-dom";
import routes from "../../../Routes";

const AnimatedRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<Switch location={location} key={location.pathname}>
				{routes.map((route) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							component={route.component}
							exact={route.exact || false}
						/>
					);
				})}
			</Switch>
		</AnimatePresence>
	);
};

export default AnimatedRoutes;
