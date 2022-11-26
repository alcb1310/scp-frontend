import { useEffect } from 'react';
// import { SERVER } from '../environment';
function App() {
	useEffect(() => {
		document.body.classList.add('bg-gray-100');
	}, []);

	return (
		<div className='px-8 py-12'>
			<h1 className='text-center font-bold text-blue-500 text-4xl'>
				Hello World
			</h1>

			<p className='text-right'>{import.meta.env.VITE_SERVER}</p>
		</div>
	);
}

export default App;
