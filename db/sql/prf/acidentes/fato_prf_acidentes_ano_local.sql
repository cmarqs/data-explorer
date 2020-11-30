
select 
	mes,
	ano,
	sum(mortos) as mortos,
	sum(feridos) as feridos,
	sum(ilesos) as ilesos,
	regiao,
	uf,
	municipio
from (
	select
		to_char(mom.data_inversa, 'MM') as mes,
		to_char(mom.data_inversa, 'YYYY') as ano,
		sum(les.mortos) as mortos,
		sum(les.feridos_graves) + sum(les.feridos_leves) as feridos,
		sum(les.ilesos) as ilesos,
		ru.regiao,
		loc.uf,
		loc.municipio 
	from prf_acidente_pessoas_lesoes les
	inner join prf_acidente_momento mom on les.acidente_id = mom.acidente_id 
	inner join prf_acidente_local loc on les.acidente_id = loc.acidente_id
	inner join depara_regiao_uf ru on loc.uf = ru.uf
	group by 
		ru.regiao,
		loc.uf, 
		loc.municipio,
		mom.data_inversa 	
) agrupado 
where agrupado.mortos > 0 or agrupado.feridos > 0
group by mes, ano, regiao, uf, municipio 
order by mortos desc
;

