import { useEffect } from 'react';
// import { SERVER } from '../environment';
function App() {
	useEffect(() => {
		document.body.classList.add('bg-gray-100');
	}, []);

	return (
		<>
			<div className='px-8 py-12'>
				<div className='md:grid md:grid-cols-12 flex flex-col items-center md:space-x-4'>
					<div className='md:col-span-5 order-2 mt-5 w-full'>
						<h1 className='text-center font-bold md:text-left text-blue-800 text-2xl'>
							Budget Control Application
						</h1>
						<p className='text-gray-700 mt-4'>
							Organize each of your project's budget and make better
							decisions
						</p>
						<a
							className='inline-block bg-blue-800 text-white px-8 py-2 mt-3 rounded-lg hover:bg-blue-300 hover:text-gray-700 shadow-lg hover:shadow-none uppercase tracking-wider'
							href='#'
						>
							Register
						</a>
						<a
							className='inline-block bg-gray-300 text-blue-800 font-bold px-8 py-2 mt-3 rounded-lg hover:bg-blue-300 hover:text-gray-700 shadow-lg hover:shadow-none ml-4 uppercase tracking-wider'
							href='#'
						>
							Login
						</a>
					</div>
					<img
						className='md:col-span-7 w-full object-fill order-1 md:order-5 rounded-lg'
						src='../../public/images/hero-image.jpg'
						alt='Budget'
					/>
				</div>
			</div>
			<div className="bg-blue-800">
				<div className="px-8 py-12 text-gray-200">
					Testimonials section
				</div>
			</div>	
		</>
	);
}

export default App;
