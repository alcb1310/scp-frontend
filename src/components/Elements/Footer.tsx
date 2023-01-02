const today = new Date();

function Footer() {
  return (
    <footer className="bg-indigo-600 text-center text-indigo-200 py-4 text-xs">
      &copy; {today.getFullYear()} by&nbsp;
      <a
        className="hover:underline hover:text-gray-100"
        href="https://www.linkedin.com/in/alcb1310"
        target="_blank"
        rel="noreferrer"
      >
        Andr&eacute;s Court
      </a>
    </footer>
  );
}

export default Footer;
