import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTask1739299588164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.task_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            CREATE TABLE IF NOT EXISTS public.task
            (
                id integer NOT NULL DEFAULT nextval('task_id_seq'::regclass),
                title character varying COLLATE pg_catalog."default" NOT NULL,
                description character varying COLLATE pg_catalog."default" NOT NULL,
                status character varying COLLATE pg_catalog."default" NOT NULL,
                user_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT task_pkey PRIMARY KEY (id),
                CONSTRAINT user_fkey FOREIGN KEY (user_id)
                    REFERENCES public.user (id)
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
            );

            ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;

            ALTER TABLE IF EXISTS public.task
                OWNER to postgres;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.task;
        `)
    }

}
