/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    iirstName: { type: 'varchar(1000)', notNull: true },
    lastName: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },
    gender: { type: 'varchar(1000)', notNull: true },
    jobRole: { type: 'varchar(1000)', notNull: true },
    department: { type: 'varchar(1000)', notNull: true },
    address: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};

exports.down = pgm => {
  const options = {
    ifExists: true
  };
  pgm.dropTable('users', options);
};
