'use client'

import { Boxes } from "@/components/Boxes";
import { Email } from "@/components/Email";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { ArrowRightIcon, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface EmailProps {
  text?: string;
  file?: File;
}

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [result, setResult] = useState<{ category: string; suggested_reply: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) setFile(files[0]);
  };

  const analyzeEmail = async ({ text, file }: EmailProps) => {
    setLoading(true);
    try {
      let payload: any = { language: "pt-BR" };

      if (file) {
        const buf = await file.arrayBuffer();
        const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        payload.file_base64 = b64;
        payload.filename = file.name;
      } else {
        payload.text = text;
      }

      const res = await api.post("/classify", payload);
      setResult({
        category: res.data.category,
        suggested_reply: res.data.suggested_reply,
      });
    } catch (err: any) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case "Produtivo":
        return "bg-green-100 text-green-800 border-green-300";
      case "Improdutivo":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "Produtivo":
        return <CheckCircle size={20} className="inline-block mr-2 text-green-600" />;
      case "Improdutivo":
        return <XCircle size={20} className="inline-block mr-2 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center text-white py-12">  
     <h1 className="font-extrabold bg-gradient-to-r from-[#4DA6FF] via-[#1E90FF] to-[#80CFFF] text-transparent -mt-8 text-7xl md:text-8xl bg-clip-text drop-shadow-lg overflow-y-visible">
      RE:ply
    </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mt-8 px-4">
        
        <section className="flex flex-col items-center gap-6 bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/10">
          <div className="flex items-start p-4 rounded-xl bg-yellow-50 border-l-4 border-yellow-400 shadow-sm w-full">
            <span className="text-2xl mr-3">💡</span>
            <p className="text-black text-md text-justify">
              <span className="font-bold">Dica:</span> Faça o upload do email em <code className="font-bold">.txt</code> ou <code className="font-bold">.pdf</code>, 
              ou cole o conteúdo para gerar uma resposta automática.
            </p>
          </div>

          <FileUpload onChange={handleFileChange} />
          <Textarea  
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Cole aqui o seu e-mail para gerar uma resposta automática..." 
            className="font-bold text-zinc-100 placeholder-zinc-100/70 w-full"
          />

          <Button
            onClick={() => analyzeEmail({ text: emailText, file })}
            disabled={loading || (!emailText && !file)}
            className="bg-gradient-to-r from-[#FFC947] to-[#FF8C00] text-gray-900 font-semibold hover:scale-105 transition-transform w-full"
            icon={ArrowRightIcon}
            iconPlacement="right"
          >
            {loading ? "Analisando..." : "Gere sua resposta automática"}
          </Button>
        </section>

        <section className="flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
          <Boxes/>  
          <div className="flex items-center gap-2">
            <p className="text-white font-bold">A IA classifica o seu e-mail em: </p>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusStyle("Produtivo")}`}>
                {getStatusIcon("Produtivo")}
                {"Produtivo"}
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusStyle("Improdutivo")}`}>
                {getStatusIcon("Improdutivo")}
                {"Improdutivo"}
            </div>
          </div>

          {result ? (<>
            <div className="flex items-center gap-4">
              <p className="text-zinc-900 text-center font-bold">CLASSIFICAÇÃO: </p>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusStyle(result.category)}`}>
                {getStatusIcon(result.category)}
                {result.category}
              </div>
            </div>
          
            <Email
              title="Resposta Sugerida"
              content={result.suggested_reply}
            />
            </>
          ):(
            <Email 
              title="Exemplo de Resposta"
              content="Olá! Claro, o relatório já está em andamento e será enviado até sexta-feira como solicitado.
              Obrigado pelo contato!"
            />
          )}
        </section>

      </div>
    </div>
  );
}

