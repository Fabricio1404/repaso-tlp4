# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **BCRYPT** → `src/PasswordService.ts` L11–31
- **VALIDAR ANTES DE HASHEAR** → `src/PasswordService.ts` L19–25
- **HASH CON SALT** → `src/PasswordService.ts` L24
- **COMPARE** → `src/PasswordService.ts` L28–30
- **FACTORY DE MIDDLEWARES / CLOSURE** → `src/authorize.ts` L4–16
- **RES.LOCALS** → `src/authorize.ts` L7
- **403** → `src/authorize.ts` L9–12
- **NEXT** → `src/authorize.ts` L14
- **VARIANTE** → `src/authorize.ts` L19–29

## Detalle archivo por archivo


### `src/PasswordService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 11–31 | **BCRYPT** | `export class PasswordService {` | Encapsula el hasheo: el resto del sistema no sabe qué algoritmo se usa (SRP) |
| 19–25 | **VALIDAR ANTES DE HASHEAR** | `async hashear(password: string): Promise<string> {` | Al menos 8 caracteres, una mayúscula y un número |
| 24 | **HASH CON SALT** | `return bcrypt.hash(password, this.costo);` | Cada llamada genera un salt distinto: mismo password → hashes distintos |
| 28–30 | **COMPARE** | `verificar(password: string, hash: string): Promise<boolean> {` | Se verifica con compare (no se vuelve a hashear: el salt sería otro) |

### `src/authorize.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–16 | **FACTORY DE MIDDLEWARES / CLOSURE** | `export function authorize(permiso: string) {` | authorize('libro:delete') devuelve un middleware que recuerda el permiso |
| 7 | **RES.LOCALS** | `const permisos = res.locals.permisos as string[] \| undefined;` | authenticate (que corre antes) dejó acá los permisos del rol |
| 9–12 | **403** | `if (permisos === undefined \|\| !permisos.includes(permiso)) {` | Autenticado pero sin el permiso: se corta la cadena respondiendo y haciendo return |
| 14 | **NEXT** | `next();` | Tiene permiso: pasa al siguiente middleware/controlador |
| 19–29 | **VARIANTE** | `export function authorizeAll(...requeridos: string[]) {` | Exige TODOS los permisos de la lista |
