--acidentes 
drop table if exists prf_acidentes cascade;
create table prf_acidentes(
	id int8 primary key,
	dthr_update timestamp
);


--momento 
drop table if exists prf_acidente_momento;
create table prf_acidente_momento(
	data_inversa date not null,
	dia_semana text not null,
	horario text not null,
	acidente_id int8 not null references prf_acidentes(id)
);

--local
drop table if exists prf_acidente_local;
create table prf_acidente_local(
	uf text not null default 'BR',
	br int4 default 0,
	km float default 0,
	municipio text,
	latitude float default 0,
	longitude float default 0,
	acidente_id int8 not null references prf_acidentes(id)
);

--detalhe
drop table if exists prf_acidente_detalhes;
create table prf_acidente_detalhes (
	ordem_tipo_acidente int4 default 1,
	tipo_acidente text,
	causa_acidente text,
	causa_principal text,
	classificacao_acidente text,
	acidente_id int8 not null references prf_acidentes(id)
);

--condições
drop table if exists prf_acidente_condicoes;
create table prf_acidente_condicoes(
	fase_dia text,
	sentido_via text,
	condicao_metereologica text,
	tipo_pista text,
	tracado_via text,
	uso_solo text,
	acidente_id int8 not null references prf_acidentes(id)
);

--veículos
drop table if exists prf_acidente_veiculos;
create table prf_acidente_veiculos(
	id_veiculo int8 not null,
	tipo_veiculo text,
	marca text,
	ano_fabricacao_veiculo text,
    acidente_id int8 not null references prf_acidentes(id)
);


--pessoas
drop table if exists prf_acidente_pessoas;
create table prf_acidente_pessoas(
	pesid int8 not null,
	tipo_envolvido text,
	estado_fisico text,
	idade int4 default 0,
	sexo text,
    acidente_id int8 not null references prf_acidentes(id)
);


--vitimas
drop table if exists prf_acidente_pessoas_lesoes;
create table prf_acidente_pessoas_lesoes(
	pesid int8 not null,
    ilesos int4 default 0,
	feridos_leves int4 default 0,
	feridos_graves int4 default 0,
	mortos int4 default 0,
	acidente_id int8 not null references prf_acidentes(id)
);