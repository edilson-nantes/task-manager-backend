import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1739283099753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS public.user_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
            
            CREATE TABLE IF NOT EXISTS public.user
            (
                id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                email character varying COLLATE pg_catalog."default" NOT NULL,
                password character varying COLLATE pg_catalog."default" NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                CONSTRAINT user_pkey PRIMARY KEY (id)
            );

            ALTER SEQUENCE public.user_id_seq OWNED BY public.user.id;

            ALTER TABLE IF EXISTS public.user
                OWNER to postgres;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.user;
        `)
    }

}
