import { ArrowRightIcon, FileInput, Mail, Shapes } from "lucide-react";

const content = [
    {
        title: "Envio do e-mail",
        icon: <Mail size={24} className="text-red-700" />
    },
    {
        title: "Classificação do e-mail",
        icon: <Shapes size={24} className="text-green-500" />
    },
    {
        title: "Geração da resposta",
        icon: <FileInput size={24} className="text-blue-500" />
    }
];

export function Boxes() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            {content.map((item, idx) => (
                <div key={item.title} className="flex items-center">
                    <div className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md w-40">
                        {item.icon}
                        <span className="text-zinc-900 font-semibold text-center">{item.title}</span>
                    </div>
                    {idx < content.length - 1 && (
                        <ArrowRightIcon size={32} className="text-yellow-400 hidden md:block ml-4" />
                    )}
                </div>
            ))}
        </div>
    );
}
