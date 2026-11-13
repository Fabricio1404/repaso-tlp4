# 09 · Criptografía con Docker y OpenSSL (tema extra)

> ⚠️ **Ojo:** esta guía viene de **Seminario de Actualización III – Ciberseguridad**, no de TLP IV. La incluí porque estaba en la carpeta de documentos. **Preguntá si entra en tu parcial.** De todos modos, varios conceptos se cruzan con TLP IV: **bcrypt** y contraseñas (integrador), **secretos** y `.env`, **HTTPS/TLS**, **Docker**.
>
> **Idea central:** no se trata de memorizar comandos, sino de entender **qué problema resuelve cada técnica**:
> - **hashing** → comprobar **integridad**
> - **cifrado simétrico** → **confidencialidad**
> - **criptografía asimétrica** → trabajar con **pares de claves**
> - **firma digital** → **integridad + autenticidad**
> - **certificados y TLS** → todo junto en HTTPS

---

## 1. Los objetivos de la seguridad

| Propiedad | Pregunta | Técnica |
|---|---|---|
| **Confidencialidad** | ¿Solo lo lee quien debe? | Cifrado (AES, RSA) |
| **Integridad** | ¿Nadie lo modificó? | Hash (SHA-256), firma |
| **Autenticación** | ¿Es quien dice ser? | Firma digital, certificados |
| **No repudio** | ¿Puede negar que lo hizo? | Firma digital (+ custodia de la clave y marco legal) |

---

## 2. Docker como "vehículo" para el laboratorio

Un **contenedor** es un entorno aislado que ejecuta procesos con sus propias dependencias. Acá Docker sirve **solo para que todos usen el mismo Linux con el mismo OpenSSL**, sin importar si la compu es Windows o Linux.

```bash
# En PowerShell / terminal del sistema (anfitrión)
docker volume create crypto-lab-data                      # volumen: los archivos sobreviven
docker run -it --name crypto-lab -v crypto-lab-data:/lab -w /lab ubuntu:24.04 bash

# Ya DENTRO del contenedor (prompt root@...:/lab#)
apt update
apt install -y openssl
openssl version
```

| Parte del comando | Qué hace |
|---|---|
| `docker run` | Crea y arranca un contenedor a partir de una imagen |
| `-it` | Interactivo con terminal |
| `--name crypto-lab` | Le pone nombre |
| `-v crypto-lab-data:/lab` | Monta el volumen en `/lab` |
| `-w /lab` | Carpeta de trabajo |
| `ubuntu:24.04` | La imagen |
| `bash` | El comando que ejecuta al arrancar |

**Otros comandos:**
```bash
exit                                     # salir del contenedor
docker start -ai crypto-lab              # volver a entrar otro día
docker exec -it crypto-lab bash          # segunda terminal en el mismo contenedor
docker cp crypto-lab:/lab/archivo.txt .  # copiar del contenedor al host
docker cp .\archivo.txt crypto-lab:/lab/ # copiar del host al contenedor
docker rm crypto-lab                     # borrar el contenedor
docker volume rm crypto-lab-data         # borrar el volumen
```

> **Windows:** en Bash se continúa una línea con `\`; en **PowerShell** con el **acento grave** `` ` ``. O escribí todo en una sola línea.
> Los archivos quedan **dentro del volumen**, no en tu Escritorio: para verlos en Windows hay que usar `docker cp`.

**¿Qué ventaja tiene que toda la clase use el mismo contenedor?** Todos tienen **exactamente** la misma versión de Linux y OpenSSL, los comandos funcionan igual y no hay que instalar nada en cada sistema operativo.

---

## 3. Hashing: detectar si un archivo cambió

Un **hash** transforma datos de **cualquier tamaño** en una salida de **longitud fija** (la "huella"). **No es cifrado**: el objetivo **no** es recuperar el original, sino **comparar** contenido.

```bash
printf "Entrega practica - version 1\n" > entrega.txt
openssl dgst -sha256 entrega.txt
# SHA2-256(entrega.txt)= 3f8a...c91d

printf "Cambio minimo\n" >> entrega.txt
openssl dgst -sha256 entrega.txt
# SHA2-256(entrega.txt)= 9b02...e7a4   ← cambió POR COMPLETO
```

**Propiedades:**
- **Determinista**: el mismo contenido da siempre el mismo hash.
- **Efecto avalancha**: un cambio mínimo cambia el hash por completo.
- **Una sola vía**: no se puede "deshashear".
- **Resistente a colisiones**: es prácticamente imposible encontrar dos contenidos con el mismo hash.

**Uso real:** al descargar una ISO, el sitio publica el SHA-256. Si el hash de tu descarga **coincide**, tenés evidencia de que **el archivo no cambió** en el camino.

> ⚠️ **SHA-256 directo NO sirve para guardar contraseñas** (es demasiado rápido: permite probar miles de millones por segundo). Para contraseñas se usan **Argon2id, bcrypt o scrypt**, con **salt** (por eso el integrador usa bcrypt).
> ⚠️ **MD5 y SHA-1** están rotos: no usarlos para seguridad en diseños nuevos.

---

## 4. Cifrado simétrico con AES

**Una misma clave secreta** para **cifrar y descifrar**. Es **rápido** → se usa para **grandes cantidades** de datos.
Algoritmos: **AES** (el actual), DES y 3DES (**solo referencia histórica**, ya inseguros).

```bash
printf "Usuario: estudiante\nToken: ABC-123\n" > secreto.txt

# Cifrar (pide una contraseña; no la escribas en el comando)
openssl enc -aes-256-cbc -salt -pbkdf2 -in secreto.txt -out secreto.enc

# Ver el contenido cifrado (bytes, ilegible)
od -An -tx1 -N32 secreto.enc

# Descifrar
openssl enc -d -aes-256-cbc -pbkdf2 -in secreto.enc -out secreto-recuperado.txt
cat secreto-recuperado.txt
```

| Opción | Qué hace |
|---|---|
| `-aes-256-cbc` | AES con clave de 256 bits, modo CBC |
| `-salt` | Agrega **aleatoriedad** (el mismo texto con la misma contraseña da distinto resultado) |
| `-pbkdf2` | Transforma la contraseña con una **función de derivación de clave**: no se usa una contraseña humana directamente como clave criptográfica |
| `-d` | Descifrar |

- **¿Qué pasa si descifrás con otra contraseña?** Falla (`bad decrypt`) o sale basura.
- **¿El cifrado CBC detecta manipulación?** **No necesariamente**: CBC da **confidencialidad**, no **integridad**. Por eso en sistemas nuevos se prefiere **cifrado autenticado**: **AES-GCM** o **ChaCha20-Poly1305** (confidencialidad + integridad juntas).

**Uso real:** backups, discos, archivos sensibles, y el **tráfico de HTTPS** una vez establecida la sesión.

> **Problema del simétrico:** ¿cómo le hacés llegar la clave secreta al otro sin que nadie la intercepte? → lo resuelve la criptografía asimétrica.

---

## 5. Criptografía asimétrica: clave pública y privada

Un **par de claves** relacionadas:
- **Clave pública**: se puede **compartir** con cualquiera.
- **Clave privada**: **solo** la tiene su dueño. **Nunca** se envía, publica ni sube a un repo.

| Para... | Se usa... |
|---|---|
| **Cifrar** un mensaje para alguien | **Su clave pública** (solo él lo descifra con su privada) |
| **Firmar** algo | **Mi clave privada** (cualquiera verifica con mi pública) |

```bash
# Generar la privada (RSA 2048 bits)
openssl genpkey -algorithm RSA -out privada.pem -pkeyopt rsa_keygen_bits:2048
# Obtener la pública a partir de la privada
openssl pkey -in privada.pem -pubout -out publica.pem

head -n 3 privada.pem     # -----BEGIN PRIVATE KEY-----
head -n 3 publica.pem     # -----BEGIN PUBLIC KEY-----

# Cifrar un mensaje CORTO con la pública
printf "Codigo de recuperacion: 839201\n" > mensaje-rsa.txt
openssl pkeyutl -encrypt -pubin -inkey publica.pem -in mensaje-rsa.txt -out mensaje-rsa.enc \
  -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256

# Descifrar con la privada
openssl pkeyutl -decrypt -inkey privada.pem -in mensaje-rsa.enc -out mensaje-rsa-dec.txt \
  -pkeyopt rsa_padding_mode:oaep -pkeyopt rsa_oaep_md:sha256
```

**¿Por qué RSA no cifra archivos grandes?** Es **costoso** y tiene **límites de tamaño**. En la práctica se usa un **esquema híbrido**: se genera una **clave simétrica temporal** que cifra los datos (rápido, AES), y la criptografía asimétrica **protege o intercambia esa clave temporal**. Así funciona TLS.

**¿Por qué la pública se puede dar a cualquiera?** Porque con la pública solo se puede **cifrar para mí** o **verificar mis firmas**; **descifrar y firmar** requieren la **privada**, que nunca sale de mi control.

**Uso real:** claves **SSH**, intercambio de claves en protocolos seguros, certificados, firmas de software.

---

## 6. Firma digital

Una firma **no oculta** el documento. Permite comprobar que:
1. el contenido **no fue modificado** (**integridad**), y
2. la firma fue hecha con **la clave privada correspondiente** (**autenticidad**).

```bash
printf "Autorizo el despliegue de la version 1.0\n" > documento.txt

# Firmar con la PRIVADA
openssl dgst -sha256 -sign privada.pem -out documento.sig documento.txt

# Verificar con la PÚBLICA
openssl dgst -sha256 -verify publica.pem -signature documento.sig documento.txt
# Verified OK

# Alterar y volver a verificar
printf "Cambio posterior\n" >> documento.txt
openssl dgst -sha256 -verify publica.pem -signature documento.sig documento.txt
# Verification failure
```

Internamente: se calcula el **hash** del documento y se lo "cifra" con la **privada**. Quien verifica recalcula el hash y lo compara usando la **pública**.

**¿Qué aporta la firma que no aporta un hash publicado en el mismo servidor?** Si un atacante modifica el archivo **y** el hash publicado en ese servidor, el hash "coincide" igual. La firma, en cambio, **no se puede falsificar sin la clave privada**: aporta **autenticidad** del origen, no solo integridad.

**Uso real:** paquetes de software, actualizaciones del sistema, PDFs, artefactos de CI/CD, certificados.

---

## 7. Certificados y TLS (HTTPS)

Un **certificado** **vincula una clave pública con una identidad** (ej. `www.banco.com`). Lo **firma** una **Autoridad de Certificación (CA)** en la que el navegador confía.

En **HTTPS**, el servidor presenta su certificado y el cliente verifica:
- que lo emitió una **CA de confianza**,
- que el **nombre** coincide con el sitio,
- que está **vigente** (fechas).

**TLS combina todo:** asimétrica + firmas + certificados para **autenticar y acordar una clave**, y después **cifrado simétrico** para el tráfico.

```bash
# Certificado AUTOFIRMADO para localhost (válido 30 días)
openssl req -x509 -newkey rsa:2048 -keyout servidor.key -out servidor.crt \
  -days 30 -nodes -subj "/C=AR/O=Laboratorio/CN=localhost"

# Inspeccionarlo
openssl x509 -in servidor.crt -noout -subject -issuer -dates -fingerprint -sha256

# Desafío: servidor TLS local y cliente
openssl s_server -accept 8443 -cert servidor.crt -key servidor.key -www
openssl s_client -connect 127.0.0.1:8443 -servername localhost -brief   # (en otra terminal)
```

**Autofirmado** = el emisor y el sujeto son el mismo. Sirve para experimentar, pero el navegador **no confía** automáticamente (no lo emitió una CA reconocida).

**¿Por qué una conexión puede estar cifrada y el certificado no ser confiable?** Porque **cifrar** y **autenticar la identidad** son cosas distintas: con un certificado autofirmado el tráfico va cifrado, pero no hay una CA que **garantice** que estás hablando con quien decís (podría ser un intermediario).

**¿Qué resuelve un certificado que una clave pública aislada no?** Una clave pública sola no dice **de quién es**. El certificado, firmado por una CA de confianza, **vincula esa clave con una identidad**.

---

## 8. Mapa: qué técnica resuelve qué

| Técnica | Qué protege / verifica | Ejemplo real |
|---|---|---|
| **SHA-256** | **Integridad** | Verificar descargas y artefactos |
| **AES** | **Confidencialidad** | Archivos, backups, datos de apps |
| **RSA / par de claves** | Operaciones con clave pública y privada | Intercambio de secretos, SSH, certificados |
| **Firma digital** | **Integridad + autenticidad** | Software firmado, documentos |
| **Certificado** | **Vincula identidad y clave pública** | HTTPS / TLS |

### Buenas prácticas
- **No inventar criptografía propia**: usar bibliotecas y protocolos revisados.
- **No publicar claves privadas**: ni en repos, ni en imágenes Docker, ni en logs.
- **No confundir hashing con cifrado**: un hash no se descifra.
- **No usar MD5 ni SHA-1** para seguridad.
- **No usar SHA-256 directo para contraseñas** → Argon2id, bcrypt, scrypt.
- En producción, preferir **cifrado autenticado** (AES-GCM, ChaCha20-Poly1305).

> **Idea final:** la criptografía no es un único mecanismo. Un sistema real **combina** técnicas, porque **confidencialidad, integridad, autenticación e identidad son problemas diferentes**.

---

## 📌 Lo que tenés que saber sí o sí

- **Hash** = huella de longitud fija, una vía, integridad. **No es cifrado.** Contraseñas → **bcrypt/Argon2id/scrypt**, no SHA-256.
- **Simétrico (AES)**: una clave para cifrar y descifrar, rápido, confidencialidad. `-salt` y `-pbkdf2`. CBC no da integridad → **AES-GCM**.
- **Asimétrico (RSA)**: par de claves; la **pública se comparte**, la **privada nunca**. Cifrar con la pública del otro; firmar con mi privada. **Esquema híbrido** para archivos grandes.
- **Firma digital**: firmar con privada, verificar con pública → **integridad + autenticidad**. Si el archivo cambia, `Verification failure`.
- **Certificado**: vincula clave pública + identidad, firmado por una **CA**. **Autofirmado** = cifra pero no es confiable. **TLS** combina todo.
- **Docker**: `docker run -it --name ... -v volumen:/lab ubuntu:24.04 bash`, `docker start -ai`, `docker exec -it`, `docker cp`.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
