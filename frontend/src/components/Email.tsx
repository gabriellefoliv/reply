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
                toast.success("Resposta copiada para a área de transferência!")
            }).catch(err => {
                toast.error('Falha ao copiar a resposta. Por favor, copie manualmente.');
                console.error("Erro pra copiar!")
            });
        }
    };

    return (
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl border mx-auto">
            <div className="bg-gray-100 rounded-xl px-4 py-2 border-b flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <button
                onClick={copyToClipboard}
                className="p-1 rounded hover:bg-gray-200 transition"
                >
                <Copy />
                </button>
            </div>

            <div className="p-4">
                <p className="text-gray-700 text-sm mt-2 break-words">
                {content}
                </p>
            </div>
        </div>

    )
}