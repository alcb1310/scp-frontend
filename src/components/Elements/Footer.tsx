const today = new Date();

function Footer() {
	return <footer className='bg-blue-800 text-center text-blue-200 py-4 text-xs'>
		&copy; {today.getFullYear()} by&nbsp;
		<a
			className='hover:underline hover:text-gray-200'
			href='https://www.linkedin.com/in/alcb1310'
			target='_blank'
		>
			Andr&eacute;s Court
		</a>
	</footer>;
}

export { Footer }