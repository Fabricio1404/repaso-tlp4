// Composition root: el único lugar donde se crean (new) y conectan las piezas.
// Orden sugerido:
//   1. DatabaseConnection.getInstance() (Singleton) → definir modelos → authenticate → sync → seed
//   2. Repositorios (Sequelize) que implementan las interfaces
//   3. EventPublisher (Subject), NotifierFactory, NotificationService (Observer) → publisher.attach(...)
//   4. Servicios (reciben interfaces por constructor)
//   5. crearApp(servicios).listen(...)
console.log('TODO: backend del laboratorio');
