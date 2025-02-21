"use client";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsShopWindow } from "react-icons/bs";
import { Youtube, Instagram } from "lucide-react";
import { RiBankLine } from "react-icons/ri";
import Link from "next/link";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Icon = string;
export type Title = string;
export type Description = string;
export type TitleClass = string;
interface FeatureProps {
	icon: Icon;
	title: Title;
	description: Description;
	titleClass: TitleClass;
}

export default function Home() {
	const { scrollYProgress } = useScroll();
	const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
	const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

	const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const translateX1 = useTransform(scrollYProgress, [0, 0.06], [0, -800]);
	const translateY = useTransform(scrollYProgress, [0, 0.08], [0, -800]);
	const translateY2 = useTransform(scrollYProgress, [0, 0.08], [0, 800]);
	const translateX2 = useTransform(scrollYProgress, [0, 0.06], [0, 800]);
	const translateY3 = useTransform(scrollYProgress, [0, 0.08], [0, -800]);
	const translateY4 = useTransform(scrollYProgress, [0, 0.08], [0, 800]);
	const bgColor = useTransform(
		scrollYProgress,
		[0, 0.08, 1],
		["#ffffff", "#ffe933", "#ffffff"]
	);
	const [isExiting, setIsExiting] = useState(false);
	const pathname = usePathname();
	useEffect(() => {
		setIsExiting(false);
	}, [pathname]);
	const handleExit = () => {
		setIsExiting(true);
	};
	// State to hold the current background color
	const [background, setBackground] = useState<any>("#ffffff");

	// Update background color on scroll
	useMotionValueEvent(bgColor, "change", (latest) => {
		setBackground(latest);
	});

	const router = useRouter();
	return (
		<motion.div
			style={{
				background: background,
			}}
			className="flex flex-col items-center justify-center p-10 min-h-screen"
		>
			<div className="absolute z-10 bottom-0 top-40 text-center">
				<p className="text-black  tracking-widest ">
					⭐⭐⭐⭐⭐ Loved by 1,000,000+ creators
				</p>
				<h1 className="text-8xl font-bold pt-10 text-center text-black">
					Fund your <br />
					creative work
				</h1>
				<p className="text-blach text-lg text-center mt-2 text-black">
					Accept support. Start a membership. Setup a shop. It's easier <br />
					than you think.
				</p>
				<Link href="/signup">
					<button className="mt-11 bg-yellow-400 text-black px-12 py-6 rounded-full text-lg font-semibold hover:bg-yellow-500 transform hover:scale-105 transition duration-300 ease-in-out has context menu">
						Start my page
					</button>
				</Link>

				<p className="text-gray-500 mt-2">
					It's free and takes less than a minute!
				</p>
			</div>

			<div className=" flex justify-between w-full mt-10">
				<div className="relative flex justify-center items-center h-[400px]">
					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "20px",
							left: "0.5px",
							transform: "rotate(-10deg)",
							x: translateX1,
							y: translateY,
						}}
						transition={{ ease: "easeOut", duration: 0.6 }}
					>
						<p className="font-semibold text-black">
							Cara is building a new platform for artists
						</p>
						<p className="text-gray-500 pt-5">❤️ 8,780 supporters</p>
					</motion.div>
					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "180px",
							left: "120px",
							transform: "rotate(-10deg)",
							x: translateX1,
						}}
						transition={{ type: "spring", stiffness: 100, damping: 20 }}
					>
						<p className="font-semibold text-black">
							Kaleigh Cohen is creating indoor cycling and strength workouts on
							YouTube!
						</p>
						<p className="text-gray-500">❤️ 4,488 supporters</p>
					</motion.div>
					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "380px",
							left: "0.1px",
							transform: "rotate(5deg)",
							x: translateX1,
							y: translateY2,
						}}
						transition={{ type: "spring", stiffness: 100, damping: 20 }}
					>
						<p className="font-semibold text-black">
							Teacher Stefano is creating YouTube videos and Podcast
						</p>
						<p className="text-gray-500">❤️ 641 supporters</p>
					</motion.div>
				</div>

				<div className="relative flex justify-end h-[400px]">
					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "20px",
							right: "120px",
							transform: "rotate(5deg)",
							x: translateX2,
							y: translateY3,
						}}
						transition={{ type: "spring", stiffness: 100, damping: 20 }}
					>
						<p className="font-semibold text-black">
							The Thrill Of The Thrift is creating thrifting videos
						</p>
						<p className="text-gray-500 pt-5">❤️ 112 supporters</p>
					</motion.div>

					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "200px",
							right: "-40px",
							transform: "rotate(5deg)",
							x: translateX2,
						}}
						transition={{ type: "spring", stiffness: 100, damping: 20 }}
					>
						<p className="font-semibold text-black">
							Beach Talk Radio is a Dinky Little Podcast
						</p>
						<p className="text-gray-500">❤️ 1,805 supporters</p>
					</motion.div>

					<motion.div
						className="bg-white text-center w-[192px] h-[172px] shadow-lg p-5 rounded-lg transform hover:scale-105 transition duration-300 ease-in-out absolute"
						style={{
							top: "380px",
							right: "100px",
							transform: "rotate(-5deg)",
							x: translateX2,
							y: translateY4,
						}}
						transition={{ type: "spring", stiffness: 100, damping: 20 }}
					>
						<p className="font-semibold text-black">
							Simple Politics is helping people have better conversations about
							politics
						</p>
					</motion.div>
				</div>
			</div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1, ease: "easeInOut" }}
			>
				<div className=" flex items-center justify-center pt-72">
					<div className="bg-white p-8 rounded-3xl shadow-xl  w-[1128px] h-[810px] text-center">
						<p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
							SUPPORT
						</p>
						<h1 className="text-6xl font-bold  mt-2 text-black">
							Give your audience <br /> an easy way to say thanks.
						</h1>
						<p className="text-gray-600 mt-4 pt-7 text-xl w-[936px] mx-auto">
							Buy Me a Coffee makes supporting fun and easy. In just a couple of
							taps, your fans <br /> can make the payment (buy you a coffee) and
							leave a message.
						</p>
						{/* <div>
            <img src="screenshot1.png" />
          </div> */}
						<div className="relative mt-8 bg-white p-6 rounded-[35px] border border-slate-100 shadow-lg mx-auto w-[386px] h-[359px]">
							<h2 className="text-2xl text-start font-semibold text-black">
								Buy Juliet a coffee
							</h2>

							<div className="flex items-center justify-center space-x-2 mt-4">
								<button className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-bold">
									1
								</button>
								<button className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full font-bold">
									3
								</button>
								<button className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full font-bold">
									5
								</button>
								<input
									type="number"
									className="w-16 h-10 border rounded-md text-center"
									placeholder="1"
								/>
							</div>

							<input
								type="text"
								className="w-full h-32 text-start -pt-14  mt-4 border pb-20 pl-3 rounded-md"
								placeholder="Say something nice..."
							/>
							<button className="w-full bg-red-500 text-white py-3 rounded-full mt-4 font-semibold">
								Support $3
							</button>
						</div>

						<div className="relative mt-6 space-y-3">
							<div className="absolute left-36 bottom-32 bg-white border border-slate-100  p-3 shadow-md rounded-3xl flex items-center space-x-2">
								<span className="bg-green-200 p-2  w-9 h-9 rounded-full">
									☕
								</span>
								<p className="text-sm p-3 font-medium text-black">
									Cathy G bought a coffee. <br />
									<span className="text-gray-500 ">Thanks Cathy! ❤️</span>
								</p>
							</div>

							<div className="absolute left-28 bottom-56 bg-white p-3 shadow-md rounded-3xl border border-slate-100 flex items-center space-x-2">
								<span className="bg-yellow-200 w-9 h-9 p-2 rounded-full">
									☕
								</span>
								<p className="text-sm font-medium  text-black">
									Anie bought 10 coffees
								</p>
							</div>

							<div className="absolute right-28 bottom-[279px] bg-white p-5 shadow-md rounded-lg flex items-center space-x-2">
								<span className="bg-yellow-200 h-9 w-9 p-2 rounded-full ">
									☕
								</span>
								<p className="text-sm font-medium text-black">
									Alex bought 25 coffees <br />
									<span className="text-gray-500">Thanks Cathy! ❤️</span>
								</p>
							</div>

							<div className="w-[400px] absolute right-10 bottom-32 bg-white p-4 border border-slate-100 shadow-md rounded-xl">
								<p className="text-sm font-medium  text-black">
									<span className="bg-yellow-200 w-7 h-7 p-2 -ml-5 rounded-full ">
										☕
									</span>
									<strong>Tony Steel bought 3 coffees.</strong>
								</p>
								<p className="text-gray-500 text-start p-4 pl-10 text-sm mt-1 ">
									Absolutely love the show! I'm already waiting for next week's
									episode, lol. Thank you and keep doing what you're doing.
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1, ease: "easeInOut" }}
				className="relative mt-6 space-y-3"
			>
				<div className="mt-16 p-10 bg-white rounded-3xl mx-auto w-[1128px] h-[834px] shadow-lg ">
					<p className="text-gray-500 uppercase tracking-widest font-bold text-center">
						Memberships
					</p>
					<h2 className="text-6xl font-bold text-center  text-black p-3 text-64 font-cr-bold mx-auto leading-80 w-11/12">
						Start a membership for <br /> your biggest fans.
					</h2>
					<p className=" text-black text-center text-xl p-2 mt-2 w-[702px] mx-auto">
						Earn a recurring income by accepting monthly or yearly <br />
						subscriptions. Share exclusive content, or just give them a <br />{" "}
						way to support your work on an ongoing basis.
					</p>
					{/* <div className="mt-5 flex  w-[936px] h-[442px]">
						<img
							src="screenshot2.png"
							className="items-center justify-center"
						/>
					</div> */}
					<div className="flex gap-6 mt-6">
						<div className="bg-white p-6 rounded-lg w-[270px] h-[387px] shadow-lg text-center">
							<img
								src="https://cdn.buymeacoffee.com/assets/img/homepage/images/membership_banner_1.png"
								alt=""
							/>
							<h3 className="font-semibold  text-black">Basic membership</h3>
							<p className="text-gray-500">$5/month</p>
							<ul className="text-left text-sm text-gray-600 list-disc pl-5">
								<li>33% OFF all my eBooks & courses</li>
								<li>Access to members-only content</li>
								<li>Exclusive posts and messages</li>
							</ul>
							<button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
								Join
							</button>
						</div>
						<div className="bg-white mx-auto p-6 rounded-lg shadow-lg text-center  w-[270px] h-[387px">
							<img
								src="https://cdn.buymeacoffee.com/assets/img/homepage/images/membership_banner_2.png"
								alt=""
							/>
							<h3 className="font-semibold  text-black">Pro membership</h3>
							<p className="text-gray-500">$15/month</p>
							<ul className="text-left text-sm leading-relaxed text-gray-600 list-disc pl-5">
								<li>Support me on a monthly basis</li>
								<li>Email alert for new posts</li>
								<li>Exclusive posts and messages</li>
							</ul>
							<button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
								Join
							</button>
						</div>
						<div className="bg-white p-6 rounded-lg shadow-lg text-center w-[270px] h-[387px">
							<img
								src="https://cdn.buymeacoffee.com/assets/img/homepage/images/membership_banner_3.png"
								alt=""
							/>
							<h3 className="font-semibold  text-black">Advanced membership</h3>
							<p className="text-gray-500">$25/month</p>
							<ul className="text-left text-sm leading-loose text-gray-600 list-disc pl-5">
								<li>Highly printable journal pages</li>
								<li>Email alert for new posts</li>
								<li>Work in progress updates</li>
							</ul>
							<button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold">
								Join
							</button>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1, ease: "easeInOut" }}
				className="flex flex-col items-center bg-white rounded-2xl shadow-lg mt-[50px] w-[1128px] h-[834px] p-6"
			>
				<div className="text-center mb-6">
					<h2 className="text-md font-bold uppercase text-gray-500">Shop</h2>
					<h1 className="text-6xl font-bold leading-tight text-black">
						Introducing Shop, <br /> the creative way to sell.
					</h1>
					<p className="p-6 mt-2  text-2xl">
						The things you’d like to sell probably do not belong in a Shopify
						store. Shop is <br /> designed from the ground up with creators in
						mind. Whether it’s a 1-1 Zoom call, art
						<br /> commissions, or an ebook, Shop is for you.
					</p>
				</div>
				{/* <div>
					<img src="screenshot3.png" />
				</div> */}
				<div className="items-center justify-center flex">
					<div className="flex mt-6 gap-4 text-center">
						<div className="bg-white p-4 rounded-lg shadow-md">
							<div className="w-10 h-10 rounded-lg overflow-hidden"></div>
							<CiDeliveryTruck className="size-10" />
							<p className="text-sm flex-1 text-black">One-tap checkout</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<BsShopWindow className="size-10" />
							<p className="text-xl font-bold text-black">753</p>
							<p className="text-sm text-gray-500">Sales</p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<p className="text-xl font-bold text-black">$244</p>
							<p className="text-sm text-gray-500">Earnings</p>
						</div>
					</div>
					<div className="w-80 p-4 bg-white rounded-2xl shadow-lg">
						<div className="bg-yellow-300 p-6 rounded-lg relative">
							<span className="absolute top-2 left-2 bg-white text-xs px-2 py-1 rounded-md font-semibold text-black">
								.PDF
							</span>
							<div className="flex justify-center">
								<img src="/assets/book.png" alt="" className="h-16" />
							</div>
						</div>
						<div className="mt-4">
							<h3 className="text-xl font-bold text-black">Design E-book</h3>
							<p className="text-gray-700 font-semibold">$200</p>
							<RiBankLine />
							<p className="text-black text-sm flex items-center gap-1">
								⭐ 4.9 (36)
							</p>
							<button className="w-full bg-yellow-400 text-black mt-4 p-2 rounded-md font-semibold">
								Buy
							</button>
						</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-md mt-4 text-center">
						<p className="text-sm text-black">Liked it? Give rating</p>
						<div className="flex justify-center gap-1 mt-1">
							{[...Array(4)].map((_, i) => (
								<span key={i} className="text-yellow-400">
									⭐
								</span>
							))}
							<span className="text-gray-300">⭐</span>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 2 }}
				transition={{ duration: 1, ease: "easeInOut" }}
				className="w-[1128px] h-[809.41px]  flex flex-col items-center bg-white rounded-lg shadow-md mt-[50px] p-8"
			>
				<div className="text-center ">
					<h3 className="text-gray-500 uppercase tracking-widest font-semibold text-sm">
						Posts, Audio & Email
					</h3>
					<h1 className="text-4xl font-bold mt-2 text-black">
						Publish your best work
					</h1>
					<p className=" mt-4 text-black">
						Buy Me a Coffee makes it easy to publish free and exclusive content.
						Try different <br /> formats such as audio, and make it members-only
						to drive more memberships.
					</p>
				</div>
				{/* <div>
					<img src="zurag22.png" className="mt-[50px] w-[936px] h-[481.41px]" />
				</div> */}
				<div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
					<div className="col-span-2 bg-white shadow-md rounded-xl overflow-hidden relative">
						<img src="/assets/aylagch.png" alt="" className="w-full" />
						<div className="absolute inset-0 flex items-center justify-center">
							<button className="bg-white p-3 rounded-full shadow-lg">
								▶️
							</button>
						</div>
						<div className="p-4 flex justify-between text-sm text-gray-500">
							<span>0:00</span>
							<span>55:08</span>
						</div>
					</div>

					<div className="relative">
						<div className="absolute top-2 left-2 w-full h-full bg-yellow-300 rounded-lg transform translate-x-2 translate-y-2"></div>
						<div className="absolute top-4 left-4 w-full h-full bg-green-300 rounded-lg transform translate-x-2 translate-y-2"></div>
						<div className="relative bg-white shadow-md rounded-xl overflow-hidden">
							<img src="/assets/gar.png" alt="" className="w-full" />
							<div className="p-3">
								<h3 className="font-bold text-black">Senak peaks 👀</h3>
								<p className="text-sm text-gray-500 flex justify-between">
									<span>❤️ 24</span> <span>💬 33</span>
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white shadow-md p-4 rounded-xl">
						<h3 className="font-bold text-black">Early access</h3>
						<p className="text-gray-500 text-sm">
							Check out this week’s episode a full 24 hours before the rest of
							the world!
						</p>
						<p className="text-gray-500 text-sm flex justify-between mt-2">
							<span>❤️ 24</span> <span>💬 33</span>
						</p>
					</div>

					<div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md w-[200px] h-[200px]">
						🔒 Locked
					</div>

					<div className="bg-green-600 p-4 rounded-xl flex items-center space-x-4 w-full max-w-lg">
						<div className="w-20 h-20 rounded-lg overflow-hidden">
							<img
								src="/assets/javhlan.png"
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex-1">
							<h3 className="text-white font-semibold">Uvs nuur</h3>
							<div className="flex items-center space-x-2 mt-2">
								<button className="text-white opacity-80 hover:opacity-100">
									⏪ 15
								</button>
								<button className="bg-white text-green-600 rounded-full p-2">
									▶
								</button>
								<button className="text-white opacity-80 hover:opacity-100">
									15 ⏩
								</button>
							</div>
							<div className="mt-2">
								<input
									type="range"
									className="w-full"
									min="0"
									max="3308"
									defaultValue="0"
								/>
								<div className="flex justify-between text-white text-sm mt-1">
									<span>0:00</span>
									<span>55:08</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				className="flex justify-center items-center w-full max-w-[1600px] h-[500px]"
			>
				<div className="p-12 text-center">
					<h1 className="text-4xl font-bold text-gray-900">
						Designed for creators,
					</h1>
					<h2 className="text-4xl font-bold text-gray-500">
						not for businesses.
					</h2>

					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left w-full max-w-[1200px] h-[280px]">
						{[
							{
								text: 'We don\'t call them "customers" or transactions. They are your supporters.',
								bold: "supporters",
							},
							{
								text: "You have 100% ownership of your supporters. We never email them, and you can export the list any time you like.",
								bold: "100% ownership",
							},
							{
								text: "You get to talk to a human for help, or if you just like some advice to hit the ground running.",
								bold: "talk to a human",
							},
							{
								text: "You get paid instantly to your bank account. No more 30-day delays.",
								bold: "No more 30-day delays",
							},
						].map((item, index) => (
							<div key={index} className="flex items-start text-lg space-x-4">
								<span className="text-2xl">✔️</span>
								<p className="text-black">
									{item.text.split(item.bold).map((part, i, arr) => (
										<React.Fragment key={i}>
											{part}
											{i < arr.length - 1 && <strong>{item.bold}</strong>}
										</React.Fragment>
									))}
								</p>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 2 }}
				transition={{ duration: 1, ease: "easeInOut" }}
				className="bg-beige-100 mt-[50px] flex items-center justify-center p-6"
			>
				<div className="bg-white  w-[1128px] h-[742px] rounded-2xl shadow-lg p-10">
					<h2 className="text-3xl font-bold text-center text-gray-900">
						Make 20% or more,
					</h2>
					<h3 className="text-xl text-center text-gray-500 mt-2">
						compared to other platforms.
					</h3>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
						<Feature
							icon="📅"
							title="Not just a membership"
							description="Creators who previously only used Patreon noticed a massive increase in earnings after accepting one-off payments."
							titleClass="text-black"
						/>
						<Feature
							icon="🌍"
							title="6 new languages"
							description="We now support Spanish, French, Italian, German and Ukrainian—making it easier for your global audience to support you."
							titleClass="text-black"
						/>
						<Feature
							icon="✉️"
							title="Email marketing"
							description="Instead of paying separately for email marketing tools like Mailchimp, send unlimited emails to your fans for free."
							titleClass="text-black"
						/>
						<Feature
							icon="❤️"
							title="Being friendly converts"
							description="ICYMI, we make it simple and fun for your supporters. While you cannot put a number on feelings, it tends to show on the results."
							titleClass="text-black"
						/>
						<Feature
							icon="🔒"
							title="Your privacy comes first"
							description="Receive fan support safely without disclosing your identity or address. We’ll do the heavy-lifting."
							titleClass="text-black"
						/>
					</div>
				</div>
			</motion.div>

			<div className="relative overflow-hidden">
				<motion.button
					onClick={handleExit}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 2, ease: "easeInOut" }}
					className="m-[12rem] w-[300px] h-[150px] bg-yellow-400 text-black px-6 py-3 rounded-full text-[2rem] font-semibold hover:bg-yellow-500 transform hover:scale-105 transition duration-300 ease-in-out"
				>
					Start my page
				</motion.button>

				{/* AnimatePresence handles the exit transition */}
				<AnimatePresence>
					{isExiting && (
						<motion.div
							onAnimationComplete={() => router.push("/signup")}
							key="exitAnimation"
							initial={{ x: "-100vw" }}
							animate={{ x: 0 }}
							exit={{ x: "100vw" }}
							transition={{ duration: 2, ease: "easeInOut" }}
							className="fixed top-0 left-0 w-full h-full bg-yellow-400 z-50"
						/>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1, ease: "easeInOut" }}
			>
				<footer className="bg-cream px-6 py-4 flex justify-between items-center text-gray-600 text-sm">
					<p>© Buy Me a Coffee</p>
					<nav className="flex gap-4">
						<a href="#" className="hover:text-black font-semibold">
							About
						</a>
						<a href="#" className="hover:text-black font-semibold">
							Help Center
						</a>
						<a href="#" className="hover:text-black font-semibold">
							Apps
						</a>
						<div className="relative group">
							<button className="hover:text-black font-semibold">
								Resources ▾
							</button>
							{/* Dropdown can be added here */}
						</div>
						<a href="#" className="hover:text-black font-semibold">
							Privacy
						</a>
						<a href="#" className="hover:text-black font-semibold">
							Terms
						</a>
					</nav>
					<div className="flex gap-3">
						<div className="flex gap-6 bg-cream p-4">
							<a href="#" className="text-black hover:opacity-75">
								<FontAwesomeIcon
									className="w-[32px] h-[32px]"
									icon={faXTwitter}
								/>
							</a>
							<a href="#" className="text-black hover:opacity-75">
								<Youtube size={32} />
							</a>
							<a href="#" className="text-black hover:opacity-75">
								<Instagram size={32} />
							</a>
						</div>
					</div>
				</footer>
			</motion.div>
		</motion.div>
	);
}
function Feature({ icon, title, description, titleClass = "" }: FeatureProps) {
	return (
		<div className="flex flex-col   p-4">
			<div className="text-4xl">{icon}</div>
			<h4 className={`font-semibold text-lg mt-2 ${titleClass}`}>{title}</h4>
			<p className="text-gray-600 mt-1">{description}</p>
		</div>
	);
}
