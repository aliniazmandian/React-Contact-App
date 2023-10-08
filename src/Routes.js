
import ShowContact from "./Pages/Contacts-ShowContact/ShowContact"
import Contacts from "./Pages/Contacts/Contacts"
import Home from "./Pages/Home/Home"





const routes = [
    { path: "/", component: Home, exact: true },
    { path: "/contacts", component: Contacts ,exact:true },
    { path: "/contacts/showContact", component: ShowContact }
]

export default routes