import { Icon } from 'semantic-ui-react';

const Footer = () => {
  return (
    <footer className="  bottom-0 mx-auto  w-full max-w-container px-0 sm:px-6 lg:px-8 h-48 mt-56 mb-0 pb-0 text-slate-200 dark:text-blue-900 ">
      <div className=" py-4  ">
        <a href="/test" className="flex items-center sm:mb-0 ">
          <Icon name="book" size="huge" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            Booking
          </span>
        </a>
        <ul className="  flex flex-wrap items-center text-sm  sm:mb-0 pt-4">
          <li>
            <a href="#" className="   mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="   mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="   mr-4 hover:underline md:mr-6 ">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="    hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr className=" border-slate-400 sm:mx-auto dark:border-gray-700 " />
      <span className="block text-sm dark:text-blue-900 text-slate-200  m:text-center ">
        <a href="/test" className="hover:underline">
          © 2022 Booking™ All Rights Reserved
        </a>{' '}
      </span>
    </footer>
  );
};
export default Footer;
