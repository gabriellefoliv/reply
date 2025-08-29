import { ArrowRightIcon, FileInput, Mail, Shapes } from "lucide-react";

export function Boxes() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md w-40">
                <Mail size={24} className="text-red-700 md:rotate-0" />
                <span className="text-zinc-900 font-semibold text-center">Envio do e-mail</span>
            </div>
            <ArrowRightIcon size={32} className="text-yellow-400 hidden md:block" />

            <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md w-40">
                <Shapes size={24} className="text-green-500" />
                <span className="text-zinc-900 font-semibold text-center">Classificação do e-mail</span>
            </div>
            <ArrowRightIcon size={32} className="text-yellow-400 hidden md:block" />

            <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md w-40">
                <FileInput size={24} className="text-blue-500" />
                <span className="text-zinc-900 font-semibold text-center">Geração da resposta</span>
            </div>  
        </div>
    )
}