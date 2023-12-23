import { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

const TextCopy = () => {

    const emailTextRef = useRef(null);
    const passwordTextRef = useRef(null);
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [copiedText, setCopiedText] = useState('');


    // 3. function for copying text
    const handleCopy = (textRef: any, text: string) => {
        if (textRef.current) {
            const textToCopy = textRef.current.textContent || '';
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setShowCopyNotification(true);
                    setCopiedText(text);
                    setTimeout(() => {
                        setShowCopyNotification(false);
                        setCopiedText('');
                    }, 1500); // Hide after 1.5 seconds
                })
                .catch((error) => {
                    console.error('Error copying text to clipboard:', error);
                    // Handle error if needed
                });
        }
    }
    return (
        <div className="w-1/2 flex flex-col  mt-10 gap-2 flex-center text-sm ">
            <div className="flex gap-4">
                <p className="">Demo Email :
                    <span ref={emailTextRef} className=" text-light-3 ml-2 hover:text-off-white hover:font-medium">johnsnow@gmail.com</span>
                </p>
                <button
                    onClick={() => handleCopy(emailTextRef, 'email')}
                    className="cursor-pointer transition duration-50 ease-in-out transform hover:scale-105 text-light-4 hover:text-light-1">
                    {showCopyNotification && copiedText === 'email' && (
                        <span className="bg-gray-800 text-white text-xs rounded-md py-1 px-2 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                            Copied
                        </span>
                    )}
                    <FaRegCopy />
                </button>
            </div>

            <div className="flex gap-4">
                <p >Demo Password :
                    <span ref={passwordTextRef} className=" text-light-3 ml-2 hover:text-off-white hover:font-medium">12345678</span>
                </p>
                <button
                    onClick={() => handleCopy(passwordTextRef, 'Password')}
                    className="cursor-pointer transition duration-50 ease-in-out transform hover:scale-105 text-light-4 hover:text-light-1">

                    <FaRegCopy />
                    {showCopyNotification && copiedText === 'Password' && (
                        <span className="bg-gray-800 text-white text-xs rounded-md py-1 px-2 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-2">
                            Copied
                        </span>
                    )}
                </button>
            </div>


        </div>
    )
}

export default TextCopy