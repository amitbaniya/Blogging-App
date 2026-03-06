import { Dispatch, SetStateAction } from "react";


interface Props {
    title: string,
    message: string,
    handleSubmit: () => void,
    setShowModal: Dispatch<SetStateAction<boolean>>
    buttonText: string
    loading: boolean

}
export default function ConfirmationModal({ title, message, handleSubmit, setShowModal, buttonText, loading = false }: Props) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen  z-3 backdrop-blur-[2px]  bg-gray-950/20 flex justify-center items-center">
            <form className="relative w-lg flex flex-col justify-center p-10 bg-white text-black gap-3
            rounded-2xl">
                <button className="absolute top-2.5 right-3 cursor-pointer" onClick={() => setShowModal(false)} disabled={loading}>
                    ×
                </button>
                <label className="font-extrabold text-lg">{title}</label>
                <p className="text-gray-500">{message}</p>
                <div className='flex justify-between gap-5 mt-10'>
                    <button className="w-full border p-3 rounded-xl
                    border-gray-400/70 cursor-pointer 
                    hover:scale-102 transition-all duration-300 ease-in-out"
                        onClick={() => setShowModal(false)}
                        disabled={loading}>Cancel</button>
                    <button
                        type="button"
                        className="w-full p-3 rounded-xl bg-[#EF4444] 
                        text-white cursor-pointer
                        hover:scale-102 transition-all duration-300 ease-in-out
                        shadow-lg shadow-red-500/30"
                        onClick={handleSubmit}
                        disabled={loading}>{buttonText}</button>
                </div>

            </form>
        </div>
    )
}