import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<nav className='flex bg-indigo-600 py-4 px-5 justify-between items-center'>
				<div className='flex items-center'>
					<div className='mr-6 text-indigo-200 h-10 w-20 bg-indigo-200 rounded-full'></div>
					<ul className='flex'>
						<li className='mr-6'>
							<Link
								to='#'
								className='text-indigo-200 hover:text-indigo-50'
							>
								Transactions
							</Link>
						</li>
						<li className='mr-6'>
							<Link
								to='#'
								className='text-indigo-200 hover:text-indigo-50'
							>
								Reports
							</Link>
						</li>
						<li className='mr-6'>
							<Link
								to='#'
								className='text-indigo-200 hover:text-indigo-50'
							>
								Parameters
							</Link>
						</li>
						<li className='mr-6'>
							<Link
								to='#'
								className='text-indigo-200 hover:text-indigo-50'
							>
								Users
							</Link>
						</li>
					</ul>
				</div>
                <Link to="#" className="text-indigo-200 hover:text-indigo-50">Logout</Link>
			</nav>
		</>
	);
};

export { NavBar };
