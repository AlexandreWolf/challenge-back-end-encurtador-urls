import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateShortUrls1591425603480
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'short_urls',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'short_url',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'original',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'expire_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('short_urls');
  }
}
