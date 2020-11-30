
---Regiao-UF
drop table depara_regiao_uf;
create table depara_regiao_uf(
	codigo int4,
	estado text,
	uf text unique,
	regiao text
);

