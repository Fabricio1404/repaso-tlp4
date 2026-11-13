# Ejercicios · Tema 09 · Criptografía

Respuestas en [../soluciones/SOLUCIONES.md](../soluciones/SOLUCIONES.md).

## Parte A · Práctico (si tenés Docker Desktop)

Hacé el **mini desafío integrador** de la guía, sin copiar los ejemplos:
1. Creá `entrega-final.txt` con tu nombre, la fecha y una frase.
2. Calculá su SHA-256 y guardalo en `hash.txt`.
3. Firmá `entrega-final.txt` con tu clave privada → `entrega-final.sig`.
4. Verificá la firma con la clave pública.
5. Cifrá el original con AES → `entrega-final.enc`.
6. Modificá una **copia** del archivo y comprobá qué pasa con el hash y con la firma.
7. Copiá a Windows **solo** lo que entregarías (¿cuáles archivos? ¿cuál **no**?).

## Parte B · ¿Qué técnica usarías?
1. Comprobar que el instalador que bajaste no se corrompió.
2. Guardar un backup que nadie pueda leer si roban el disco.
3. Que tus usuarios puedan verificar que una actualización la publicaste vos.
4. Guardar las contraseñas de los usuarios de tu app.
5. Que el navegador sepa que está hablando con el banco de verdad.
6. Mandarle a alguien una clave AES sin que nadie la intercepte.

## Parte C · Verdadero o falso (justificá)
1. Un hash se puede descifrar si tenés la clave.
2. La clave pública se puede subir a GitHub sin problema.
3. Con AES-CBC se detecta automáticamente cualquier modificación del archivo cifrado.
4. RSA es ideal para cifrar archivos de varios GB.
5. Un certificado autofirmado cifra la conexión, pero el navegador no confía en él automáticamente.
6. SHA-256 es una buena opción para guardar contraseñas.
7. Una firma digital oculta el contenido del documento.
8. MD5 es seguro para verificar integridad en diseños nuevos.

## Parte D · Preguntas de cierre (de la guía)
1. ¿Hashing y cifrado son lo mismo? Justificá con una diferencia concreta.
2. ¿Por qué el cifrado simétrico es más apropiado para archivos grandes que RSA?
3. ¿Qué cambia entre verificar un hash y verificar una firma digital?
4. ¿Qué problema resuelve un certificado que una clave pública aislada no resuelve?
5. ¿Qué artefactos del laboratorio nunca deberías subir a un repositorio público?
6. ¿Para qué sirven `-salt` y `-pbkdf2`?
7. ¿Qué ventaja tiene que toda la clase use el mismo contenedor?
