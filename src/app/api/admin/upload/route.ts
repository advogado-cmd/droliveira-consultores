import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";

// Gera o token de upload direto para o Vercel Blob, somente para a sessao admin. O caminho e aleatorio; a URL nunca e exposta ao cliente final.
export async function POST(req: Request) {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body, request: req,
      onBeforeGenerateToken: async () => {
        if (!(await getSession("admin"))) throw new Error("não autorizado");
        return { allowedContentTypes: ["text/html"], maximumSizeInBytes: 200 * 1024 * 1024, addRandomSuffix: true };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(json);
  } catch (e) { return NextResponse.json({ error: (e as Error).message }, { status: 401 }); }
}
