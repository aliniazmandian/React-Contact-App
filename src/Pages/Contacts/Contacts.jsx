import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import http from "../../Services/HttpServices";
import style from "./Contacts.module.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"

const Contacts = () => {
	const [contacts, setContacts] = useState(null);
	const [mainState, setMainState] = useState(null);
	const [newContact, setNewContact] = useState({
		name: "",
		phone: "",
		email: "",
	});
	const [isShowNewContact, setIsShowNewContact] = useState(true);
	const [isNotifShow, setIsNotifShow] = useState(false);

	//* FORMIK

	const initialValues = {
		name: "",
		phone: "",
		email: "",
	};

	const onSubmit = (values) => {};

	// const validate = (values) => {
	// 	let errors = {};
	// 	if (!values.name) {
	// 		errors.name = " Name is required";
	// 	}

	// 	if (!values.phone) {
	// 		errors.phone = " Phone is required";
	// 	}

	// 	if (!values.email) {
	// 		errors.email = " Email is required";
	// 	}
	// 	return errors;
	// };

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		phone:Yup.number().required("Phone is required"),
		email:Yup.string().email("Not valid Email !").required("Email is required"),
	})

	const formik = useFormik({ initialValues, onSubmit, validationSchema,validateOnMount:true });

	
	//* FORMIK

	useEffect(() => {
		const getData = async () => {
			const { data } = await http.get("/contacts");
			setContacts(data);
			setMainState(data);
		};

		getData();
	}, []);

	const searchHandler = (input) => {
		const filtredContacts = mainState.filter((contact) => {
			return contact.name
				.toLowerCase()
				.includes(input.target.value.toLowerCase());
		});

		setContacts(filtredContacts);
	};

	const changeHandler = (e) => {
		setNewContact({ ...newContact, [e.target.name]: e.target.value });
	};

	const saveHandler = async () => {
		await http.post("/contacts", newContact);

		const { data } = await http.get("/contacts");
		setContacts(data);
		setMainState(data);

		setIsShowNewContact(!isShowNewContact);

		setIsNotifShow(!isNotifShow);

		setTimeout(() => {
			setIsNotifShow(false);
		}, 3000);
	};

	const animate = {
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

	return (
		<div className={style.container}>
			<motion.div
				className={style.motion}
				variants={animate}
				animate="show"
				exit="hide"
				transition={animate.transition}
			>
				<div className={style.listcontainer}>
					<div
						className={`${style.popUpBack} ${isShowNewContact && style.active}`}
						onClick={() => setIsShowNewContact(!isShowNewContact)}
					></div>
					<div className={`${style.popUp} ${isShowNewContact && style.active}`}>
						<div className={style.popUpContainer}>
							<span className={style.popUpTitle}>New Contact</span>
							<img
								className={style.image}
								src={require("../../Assets/images/avatar.jpg")}
								alt="p"
							/>
							<div className={style.inputContainer}>
								<div className={style.lableContainer}>
									<label htmlFor="name">Name</label>
									<input
										name="name"
										id="name"
										type="text"
										{...formik.getFieldProps("name")}
									/>
									{formik.errors.name &&formik.touched.name && (
										<div className={style.error}> {formik.errors.name} </div>
									)}
								</div>

								<div className={style.lableContainer}>
									<label htmlFor="phone">Phone</label>
									<input
										name="phone"
										id="phone"
										type="number"
										{...formik.getFieldProps("phone")}
									/>
									{formik.errors.phone && formik.touched.phone && (
										<div className={style.error}> {formik.errors.phone} </div>
									)}
								</div>

								<div className={style.lableContainer}>
									<label htmlFor="email">Email</label>
									<input
										name="email"
										id="email"
										type="email"
										{...formik.getFieldProps("email")}
									/>
									{formik.errors.email &&formik.touched.email && (
										<div className={style.error}> {formik.errors.email} </div>
									)}
								</div>
							</div>
							<div className={style.popUpIconContainer}>
								<button className={style.pupUpBtn} onClick={saveHandler} disabled={!formik.isValid} >
									Save
								</button>

								<button
									className={style.pupUpBtn}
									onClick={() => setIsShowNewContact(!isShowNewContact)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>

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

					<div className={style.contactList}>
						<div className={style.searchContainer}>
							<input
								className={style.inputSearch}
								placeholder="Search . . ."
								type="text"
								onChange={(e) => searchHandler(e)}
							/>
							<button className={style.btnSearch}>
								<BsSearch />
							</button>
						</div>
						{!mainState ? (
							<div className={style.loadingContainer}>
								<span className={style.loading}>Loading...</span>
							</div>
						) : (
							<>
								<div className={style.contactsHead}>
									<span className={style.pageTitle}>Contacts</span>

									<a
										className={style.iconHolder}
										onClick={() => setIsShowNewContact(true)}
									>
										<span className={style.icon}>
											<i class="fa-solid fa-user-plus"></i>
										</span>
										<span className={style.iconTitle}>New Contact</span>
									</a>
								</div>

								<ul>
									{contacts.map((contact) => {
										return (
											<Link
												key={contact.id}
												to={{
													pathname: "/contacts/showContact",
													search: `id=${contact.id}`,
												}}
												className={style.link}
											>
												<li key={contact.id}>
													<span>{contact.name}</span>
												</li>
											</Link>
										);
									})}
								</ul>
							</>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Contacts;
