import { RegistroAuditoria } from './auditoria/auditoria';
import { crearApp } from './app';
import { CompraRepositoryEnMemoria } from './repositories/compra.repository';

const auditoria = new RegistroAuditoria();
crearApp(new CompraRepositoryEnMemoria(), [auditoria]).listen(3000, () => console.log('API de compras en :3000'));
