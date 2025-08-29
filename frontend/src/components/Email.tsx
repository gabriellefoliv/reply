import { toast } from "sonner";
import Copy from "./ui/copy";

interface EmailProps {
    title: string
    content: string
}

export function Email({title, content}: EmailProps) {

    const copyToClipboard = () => {
        if (content) {
            navigator.clipboard.writeText(content).then(() => {
                toast.success("URL copiada para a área de transferência!")
            }).catch(err => {
                toast.error('Falha ao copiar a URL. Por favor, copie manualmente.');
                console.error("Erro pra copiar!")
            });
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl border overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">{title}</span>
                <button
                    onClick={copyToClipboard} 
                    className="transparent"
                >
                    <Copy />
                </button>
            </div>
            <div className="p-4">
            <div className="flex">
            </div>
            <p className="text-gray-700 text-sm mt-2">
                {content}
            </p>
            </div>
        </div>  
    )
}