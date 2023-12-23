import { IconType } from 'react-icons';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const socialIcons: { icon: IconType; link: string }[] = [
    { icon: FaGithub, link: 'https://github.com/example' },
    { icon: FaTwitter, link: 'https://twitter.com/example' },
    { icon: FaLinkedin, link: 'https://linkedin.com/in/example' },
];

const Footer: React.FC = () => {
    return (
        <footer className=" text-white py-6 w-full bg-black flex flex-col gap-3 md:gap-5">
            <div className="flex justify-center space-x-4 md:space-x-6">
                {socialIcons.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-400 transition duration-300"
                        >
                            <Icon className="md:w-6 md:h-6 h-4 w-4" />
                        </a>
                    );
                })}
            </div>
            <div className="flex-center text-light-3 md:small-regular tiny-medium ">
                © {new Date().getFullYear()} Snapbook, Made with
                <span className='text-red'> ❤️</span>
            </div>
        </footer>
    );
};

export default Footer;
