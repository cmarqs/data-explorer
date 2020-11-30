

insert into prf_acidentes
select distinct 
	id::int8,
	now()
from prf_data_raw pdr;



insert into prf_acidente_momento
select distinct 
	to_date(data_inversa, 'YYYY-MM-DD'),
	dia_semana ,
	horario,
	id::int8
from prf_data_raw;


insert into prf_acidente_local
select distinct
	uf,
	br::int4,
	replace(km, ',', '.')::float,
	municipio,
	replace(latitude, ',', '.')::float,
	replace(longitude, ',', '.')::float,
	id::int8
from prf_data_raw;


insert into prf_acidente_detalhes
select distinct 
	ordem_tipo_acidente::int4,
	tipo_acidente,
	causa_acidente ,
	causa_principal,
	classificacao_acidente,
	id::int8
from prf_data_raw;


insert into prf_acidente_condicoes
select distinct 
	fase_dia,
	sentido_via,
	condicao_metereologica,
	tipo_pista,
	tracado_via,
	uso_solo,
	id::int8
from prf_data_raw pdr;



insert into prf_acidente_veiculos
select distinct
	id_veiculo::int8,
	tipo_veiculo,
	marca,
	ano_fabricacao_veiculo,
	id::int8
from prf_data_raw pdr where id_veiculo notnull;



insert into prf_acidente_pessoas 
select distinct
	coalesce(pesid::int8, 0),
	tipo_envolvido,
	estado_fisico,
	idade::int4,
	sexo,
	id::int8
from prf_data_raw pdr;



insert into prf_acidente_pessoas_lesoes
select distinct
	coalesce(pesid::int8, 0) pesid,
    ilesos::int4,
    feridos_leves::int4,
    feridos_graves::int4,
    mortos::int4,
    id::int8
from prf_data_raw pdr;





