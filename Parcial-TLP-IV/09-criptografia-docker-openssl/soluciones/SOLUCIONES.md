# Soluciones · Tema 09 · Criptografía

## Parte A
```bash
printf "Nombre: Ana Gómez\nFecha: 12/11/2026\nFrase: prueba de entrega\n" > entrega-final.txt
openssl dgst -sha256 entrega-final.txt > hash.txt
openssl dgst -sha256 -sign privada.pem -out entrega-final.sig entrega-final.txt
openssl dgst -sha256 -verify publica.pem -signature entrega-final.sig entrega-final.txt   # Verified OK
openssl enc -aes-256-cbc -salt -pbkdf2 -in entrega-final.txt -out entrega-final.enc
cp entrega-final.txt copia.txt && printf "cambio\n" >> copia.txt
openssl dgst -sha256 copia.txt                                                         # hash distinto
openssl dgst -sha256 -verify publica.pem -signature entrega-final.sig copia.txt          # Verification failure
```
Se entregan: `entrega-final.txt`, `hash.txt`, `entrega-final.sig`, `entrega-final.enc` y `publica.pem`. **Nunca** `privada.pem`.
- Confidencialidad: `entrega-final.enc`. Integridad: `hash.txt` y la firma. Con la pública se **verifica** la firma. La privada no se comparte porque con ella cualquiera podría **firmar en tu nombre** y **descifrar** lo que te cifren.

## Parte B
1. **Hash** (SHA-256) comparado con el publicado. 2. **Cifrado simétrico** (AES). 3. **Firma digital**. 4. **bcrypt / Argon2id / scrypt** (hash lento con salt). 5. **Certificado** emitido por una CA + TLS. 6. **Asimétrica**: cifrarla con su clave pública (esquema híbrido).

## Parte C
1. **F**: un hash es de una vía; no hay clave ni forma de recuperarlo.
2. **V**: está hecha para compartirse.
3. **F**: CBC da confidencialidad, no integridad; para eso, cifrado autenticado (AES-GCM, ChaCha20-Poly1305).
4. **F**: RSA es costoso y tiene límite de tamaño; se usa un esquema híbrido.
5. **V**.
6. **F**: es demasiado rápido; usar bcrypt, scrypt o Argon2id con salt.
7. **F**: la firma no oculta nada; garantiza integridad y autenticidad.
8. **F**: MD5 (y SHA-1) están rotos para seguridad.

## Parte D
1. No. El **hash** no se puede revertir (sirve para comparar/integridad); el **cifrado** sí se revierte con la clave (sirve para confidencialidad).
2. Porque es mucho más rápido y no tiene el límite de tamaño de RSA; RSA se usa para proteger la clave simétrica (esquema híbrido).
3. Un hash solo prueba que el contenido coincide con **ese** hash (si el atacante cambia los dos, no se detecta). La firma prueba además que la hizo **el dueño de la clave privada** (autenticidad).
4. Vincula la clave pública con una **identidad**, avalada por una CA de confianza. Una clave suelta no dice de quién es.
5. `privada.pem`, `servidor.key`, contraseñas y cualquier secreto (tampoco en imágenes Docker ni logs).
6. `-salt` agrega aleatoriedad; `-pbkdf2` deriva una clave criptográfica a partir de la contraseña humana, en vez de usarla directamente.
7. Todos tienen el mismo entorno (misma versión de Linux y OpenSSL), los comandos funcionan igual en Windows y Linux, y no hay que instalar nada en cada máquina.
