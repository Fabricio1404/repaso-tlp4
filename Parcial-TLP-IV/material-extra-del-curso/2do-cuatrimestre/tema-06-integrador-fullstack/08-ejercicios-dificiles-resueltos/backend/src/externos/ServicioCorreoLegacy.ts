// Servicio de correo de la universidad (código EXTERNO: no se puede modificar).
// Recibe destinatario, asunto y cuerpo como textos y es sincrónico.
export class ServicioCorreoLegacy {
  enviarCorreo(para: string, asunto: string, cuerpo: string): { ok: boolean } {
    if (!para.includes('@')) return { ok: false };
    console.log(`[CORREO] ${para} · ${asunto} · ${cuerpo}`);
    return { ok: true };
  }
}
