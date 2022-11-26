import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.body.classList.add('bg-gray-100');
	}, []);

	return (
		<div className='px-8 py-12'>
			<h1 className="text-center font-bold text-blue-500 text-4xl">Hello World</h1>
		</div>
	);
}

export default App;
