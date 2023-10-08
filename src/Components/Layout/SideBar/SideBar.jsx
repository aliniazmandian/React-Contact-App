

import style from "./SideBar.module.css"


const SideBar = () => {
    return ( 
        <aside className={style.aside}>
            <div className={style.container}>
                <div className={style.iconContainer} >
                    <i class="fa-solid fa-gear"></i>
                    <span className={style.title}>Settings</span>
                </div>
                 
            </div>
        </aside>
     );
}
 
export default SideBar;


