import style from "./ShowContact.module.css";
import { motion } from "framer-motion";
import quaryString from "query-string";
import { useEffect, useRef, useState } from "react";
import http from "../../Services/HttpServices";
import { Link } from "react-router-dom";

const ShowContact = ({ location }) => {
	const animatePage = {
		show: {
			opacity: [0, 1],
			y: [200, 0],
			height: ["140vh", "80vh"],
		},
		hide: {
			opacity: [1, 0],
			y: [0, 150],
			height: ["80vh", "140vh"],
		},
		transition: { duration: 0.5, ease: "easeInOut" },
	};

	const animateData = {
		show: {
			opacity: [0, 1],
			y: [100, 0],
			height: ["130vh", "70vh"],
		},
		hide: {
			opacity: [1, 0],
			y: [0, 100],
			height: ["70vh", "130vh"],
		},
		transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 },
	};

	const [isNotifShow, setIsNotifShow] = useState(false);
	const idOpj = quaryString.parse(location.search);
	const id = idOpj.id;
	const [contact, setContact] = useState(null);
	const [mainState, setMainState] = useState(null);
	const pupUpBack = useRef();
	const pupUp = useRef();
	const inputPhone = useRef();
	const inputName = useRef();
	const inputEmail = useRef();
	const btnSave = useRef();
	const btnDelet = useRef();
	const divEditBtnContainer = useRef();

	useEffect(() => {
		if (id) {
			http.get(`/contacts/${id}`).then((response) => {
				setContact(response.data);
				setMainState(response.data);
			});
		}
	}, []);

	const popUpOpenHandler = () => {
		pupUpBack.current.style.display = "block";
		pupUp.current.style.transform = "translateY(20vh)";
		pupUp.current.style.opacity = "1";
	};

	const popUpCloseHandler = () => {
		pupUpBack.current.style.display = "none";
		pupUp.current.style.transform = "translateY(-60vh)";
		// pupUp.current.style.opacity="0"
	};

	const deletHandler = () => {
		http.delete(`/contacts/${id}`);
	};

	const editOpenHandler = () => {
		divEditBtnContainer.current.style.left = "-50px";
		divEditBtnContainer.current.style.opacity = "1";
		inputPhone.current.readOnly = false;
		inputName.current.readOnly = false;
		inputEmail.current.readOnly = false;
		inputPhone.current.style.border = "2px solid var(--backGround-main-color)";
		inputName.current.style.border = "2px solid var(--backGround-main-color)";
		inputEmail.current.style.border = "2px solid var(--backGround-main-color)";
	};

	const editCloseHandler = () => {
		divEditBtnContainer.current.style.left = "85px";
		divEditBtnContainer.current.style.opacity = "0";
		inputPhone.current.readOnly = true;
		inputName.current.readOnly = true;
		inputEmail.current.readOnly = true;
		inputPhone.current.style.border = "2px solid transparent";
		inputName.current.style.border = "2px solid transparent";
		inputEmail.current.style.border = "2px solid transparent";
		inputName.current.style.animationName = "";
		setContact(mainState);
	};

	const editSaveHandler = () => {
		divEditBtnContainer.current.style.left = "85px";
		divEditBtnContainer.current.style.opacity = "0";
		inputPhone.current.readOnly = true;
		inputName.current.readOnly = true;
		inputEmail.current.readOnly = true;
		inputPhone.current.style.border = "2px solid transparent";
		inputName.current.style.border = "2px solid transparent";
		inputEmail.current.style.border = "2px solid transparent";
		inputName.current.style.animationName = "";
	};

	const changeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(e.target.name);
		setContact({ ...contact, [name]: value });
	};

	const saveContactHandler = () => {
		const put = async () => {
			await http.put(`/contacts/${id}`, contact);
			const { data } = await http.get(`/contacts/${id}`);
			setMainState(data);
			setContact(data);
		};

		put();

		editSaveHandler();
		setIsNotifShow(!isNotifShow);

		setTimeout(() => {
			setIsNotifShow(false);
		}, 3000);
	};

	return (
		<div className={style.container}>
			<motion.div
				className={style.motion}
				variants={animatePage}
				animate="show"
				exit="hide"
				transition={animatePage.transition}
			>
				<div className={style.contactContainer}>

					<div className={`${style.toast} ${isNotifShow && style.active}`}>
						<div className={style.toastContent}>
							<i class="fa-solid fa-check"></i>
							<div className={style.message}>
								<span className={`${style.text} ${style.text1}`}>Success</span>
								<span className={`${style.text} ${style.text2}`}>
									Your changes has been saved
								</span>
							</div>
						</div>
						<div
							className={`${style.progress} ${isNotifShow && style.active}`}
						></div>
					</div>
					
					<div
						className={style.popUpBack}
						onClick={popUpCloseHandler}
						ref={pupUpBack}
					></div>
					<div className={style.popUp} ref={pupUp}>
						<div className={style.popUpContainer}>
							<span className={style.popUpTitle}>Delete Contact ?</span>
							<div className={style.popUpIconContainer}>
								<Link to="/contacts" onClick={deletHandler}>
									<button className={style.pupUpBtn}>Yes</button>
								</Link>

								<button className={style.pupUpBtn} onClick={popUpCloseHandler}>
									Cancel
								</button>
							</div>
						</div>
					</div>
					{!mainState ? (
						<span className={style.loading}>Loading...</span>
					) : (
						<motion.div
							variants={animateData}
							animate="show"
							exit="hide"
							transition={animateData.transition}
							className={style.contactData}
						>
							<div className={style.header}>
								<Link to={"/contacts"} className={style.backLink}>
									<button className={style.btn}>
										<i class="fa-solid fa-chevron-left"></i>
									</button>
								</Link>
								<div className={style.nameContainer}>
									<img
										className={style.image}
										src={require("../../Assets/images/avatar.jpg")}
										alt="p"
									/>
									<input
										onChange={(e) => changeHandler(e)}
										name="name"
										className={style.inputName}
										id="phone"
										value={contact.name}
										ref={inputName}
										readOnly={true}
										type="text"
									/>
								</div>

								<div className={style.iconContainer}>
									<button onClick={editOpenHandler} className={style.btn}>
										<i class="fa-solid fa-user-pen"></i>
									</button>

									<button
										className={` ${style.btn} ${style.delet} `}
										onClick={popUpOpenHandler}
									>
										<i class="fa-solid fa-trash-can"></i>
									</button>

									<div
										ref={divEditBtnContainer}
										className={style.editBtnContainer}
									>
										<span className={style.editTitle}>Edit</span>
										<button
											ref={btnSave}
											className={` ${style.btn} ${style.save} `}
											onClick={saveContactHandler}
										>
											<i class="fa-solid fa-floppy-disk"></i>
										</button>
										<button
											ref={btnDelet}
											className={` ${style.btn} ${style.cancel} `}
											onClick={editCloseHandler}
										>
											<i class="fa-solid fa-square-xmark"></i>
										</button>
									</div>
								</div>
							</div>

							<div className={style.contactTextContainer}>
								<div className={style.inputContainer}>
									<label className={style.lable} htmlFor="phone">
										Phone :
									</label>
									<input
										onChange={(e) => changeHandler(e)}
										name="phone"
										className={style.input}
										id="phone"
										value={contact.phone}
										ref={inputPhone}
										readOnly={true}
										type="text"
									/>
								</div>

								<span className={style.line}></span>
								<div className={style.inputContainer}>
									<label className={style.lable} htmlFor="phone">
										Email :
									</label>
									<input
										onChange={(e) => changeHandler(e)}
										name="email"
										className={style.input}
										id="phone"
										value={contact.email}
										ref={inputEmail}
										readOnly={true}
										type="text"
									/>
								</div>
							</div>
						</motion.div>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default ShowContact;
